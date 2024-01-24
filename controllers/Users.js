const pool = require("../models/db");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const passport = require("passport");

module.exports = {
  register: [
    // Validation middleware
    body("username")
      .isLength({ min: 5 })
      .withMessage("Username must be at least 5 characters long"),
    body("email").isEmail().withMessage("Invalid email address"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),

    // Controller method
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      try {
        const { username, password, name, email } = req.body;

        // Check if user already exists
        const userCheck = await pool.query(
          "SELECT * FROM users WHERE email = $1",
          [email]
        );
        if (userCheck.rows.length > 0) {
          return res.status(409).json({ message: "Username already exists" });
        }

        // Hash password
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Store new user in the database
        const newUser = await pool.query(
          "INSERT INTO users (name, email, username, password) VALUES ($1, $2, $3, $4) RETURNING *",
          [name, email, username, hashedPassword]
        );

        // Exclude password from the response
        const { password: _, ...userData } = newUser.rows[0];
        // create new users cart
        await pool.query("INSERT INTO carts (user_id) VALUES ($1)", [
          userData.id,
        ]);
        req.session.userId = newUser.rows[0].id;

        res.status(201).json({ userData, sessionId: req.session.id });
      } catch (error) {
        res.status(500).json({ error: "Internal server error" });
      }
    },
  ],

  login: [
    passport.authenticate("local"),
    (req, res) => {
      res.json({
        message: "Logged in succesfully",
        sessionId: req.session.id,
        isAuthenticated: req.isAuthenticated(),
      });
    },
  ],

  logout: (req, res) => {
    req.logout(function (err) {
      if (err) {
        return next(err); // or handle the error in another appropriate way
      }
      res.json({ message: "Successfully logged out" });
    });
  },

  profile: (req, res) => {
    try {
      if (req.isAuthenticated()) {
        const userData = { ...req.user };
        delete userData.password;
        res.json(userData);
      } else {
        res.status(401).json({ message: "Not authenticated" });
      }
    } catch (err) {
      console.log(err);
    }
  },

  getCart: async (req, res) => {
    if (req.isAuthenticated()) {
      try {
        const userId = req.user.id;
        const usersCart = await pool.query(
          "SELECT u.name AS UserName, p.id AS ProductID, p.name AS ProductName, p.description, p.price, p.category, p.image_url, SUM(cp.quantity) AS quantity FROM users u INNER JOIN carts c ON u.id = c.user_id INNER JOIN carts_products cp ON c.id = cp.cart_id INNER JOIN products p ON cp.product_id = p.id WHERE u.id = $1 GROUP BY u.name, p.id, p.name, p.description, p.price, p.category, p.image_url;",
          [userId]
        );

        res.json(usersCart.rows);
      } catch (error) {
        res.status(500).json({ message: "Something went wrong" });
      }
    } else {
      res.status(401).json({ message: "Not authenticated" });
    }
  },
  addToCart: async (req, res) => {
    if (req.isAuthenticated()) {
      try {
        const userId = req.user.id;
        const { productId, quantity } = req.body;

        // Check if productId and quantity are provided
        if (!productId || !quantity) {
          return res
            .status(400)
            .json({ message: "ProductId and quantity are required" });
        }

        const cartResult = await pool.query(
          "SELECT id FROM carts WHERE user_id = $1",
          [userId]
        );

        // Check if the user has a cart
        if (cartResult.rows.length === 0) {
          return res.status(404).json({ message: "User does not have a cart" });
        }

        const cartId = cartResult.rows[0].id;

        // Check if the product is already in the cart
        const existingProduct = await pool.query(
          "SELECT quantity FROM carts_products WHERE cart_id = $1 AND product_id = $2",
          [cartId, productId]
        );

        if (existingProduct.rows.length > 0) {
          // Product is already in the cart, update the quantity
          const updatedQuantity = existingProduct.rows[0].quantity + quantity;
          await pool.query(
            "UPDATE carts_products SET quantity = $1 WHERE cart_id = $2 AND product_id = $3",
            [updatedQuantity, cartId, productId]
          );
        } else {
          // Product is not in the cart, insert a new row
          await pool.query(
            "INSERT INTO carts_products (cart_id, product_id, quantity) VALUES ($1, $2, $3)",
            [cartId, productId, quantity]
          );
        }

        res.json({ message: "Product added to cart successfully" });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Something went wrong" });
      }
    } else {
      res.status(401).json({ message: "Not authenticated" });
    }
  },
  increaseQuantity: async (req, res) => {
    if (req.isAuthenticated()) {
      try {
        const userId = req.user.id;
        const productId = req.body.productId;
        const cartResult = await pool.query(
          "SELECT id FROM carts WHERE user_id = $1",
          [userId]
        );
        const cartId = cartResult.rows[0].id;
        await pool.query(
          `
        UPDATE carts_products
        SET quantity = quantity + 1
        WHERE cart_id = $1 AND product_id = $2
      `,
          [cartId, productId]
        );
        res.json({ message: "Quantity increased" });
      } catch (err) {
        res.status(500).json({ message: "Something went wrong" });
      }
    }
  },
  decreaseQuantity: async (req, res) => {
    if (req.isAuthenticated()) {
      try {
        const userId = req.user.id;
        const productId = req.body.productId;

        const cartResult = await pool.query(
          "SELECT id FROM carts WHERE user_id = $1",
          [userId]
        );

        if (cartResult.rows.length === 0) {
          // The user doesn't have a cart
          return res.status(404).json({ message: "User does not have a cart" });
        }

        const cartId = cartResult.rows[0].id;

        const existingProduct = await pool.query(
          "SELECT quantity FROM carts_products WHERE cart_id = $1 AND product_id = $2",
          [cartId, productId]
        );

        if (existingProduct.rows.length === 0) {
          // The product is not in the cart
          return res
            .status(404)
            .json({ message: "Product not found in the cart" });
        }

        // Decrease the quantity
        const updatedQuantity = Math.max(
          existingProduct.rows[0].quantity - 1,
          0
        );
        await pool.query(
          "UPDATE carts_products SET quantity = $1 WHERE cart_id = $2 AND product_id = $3",
          [updatedQuantity, cartId, productId]
        );

        res.json({ message: "Quantity decreased" });
      } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Something went wrong" });
      }
    }
  },

  removeFromCart: async (req, res) => {
    if (req.isAuthenticated()) {
      try {
        const userId = req.user.id;
        const productId = req.body.productId;
        const cartResult = await pool.query(
          "SELECT id FROM carts WHERE user_id = $1",
          [userId]
        );
        const cartId = cartResult.rows[0].id;
        await pool.query(
          "DELETE FROM carts_products WHERE cart_id = $1 AND product_id = $2",
          [cartId, productId]
        );
        res.json({ message: "Product removed from cart succesfully" });
      } catch (error) {
        res.status(500).json({ message: "Something went wrong" });
      }
    }
  },
  checkOut: async (req, res) => {
    if (req.isAuthenticated()) {
      try {
        const userId = req.user.id;
        const today = new Date();
        const dd = String(today.getDate()).padStart(2, "0");
        const mm = String(today.getMonth() + 1).padStart(2, "0"); // January is 0!
        const yyyy = today.getFullYear();

        const finalDate = `${dd}/${mm}/${yyyy}`;
        const newOrder = await pool.query(
          "INSERT INTO orders (user_id, order_date) VALUES ($1, $2) RETURNING id",
          [userId, finalDate]
        );
        const newOrderId = newOrder.rows[0].id;
        const cartResults = await pool.query(
          "SELECT id FROM carts WHERE user_id = $1",
          [userId]
        );
        const cartId = cartResults.rows[0].id;
        const cartItems = await pool.query(
          "SELECT product_id, quantity FROM carts_products WHERE cart_id = $1",
          [cartId]
        );
        for (const item of cartItems.rows) {
          await pool.query(
            "INSERT INTO products_orders (order_id, product_id, quantity) VALUES ($1, $2, $3)",
            [newOrderId, item.product_id, item.quantity]
          );
        }
        await pool.query("DELETE FROM carts_products WHERE cart_id = $1", [
          cartId,
        ]);
        res.json({ message: "Checkout successful", orderId: newOrderId });
      } catch (error) {
        res.status(500).json({ message: "Something went wrong." });
      }
    }
  },
  getPastOrders: async (req, res) => {
    if (req.isAuthenticated()) {
      try {
        const userId = req.user.id;
        const allOrders = await pool.query(
          "SELECT o.id AS order_id, o.order_date, jsonb_agg(jsonb_build_object('name', p.name, 'quantity', po.quantity, 'cost', po.quantity * p.price, 'image', p.image_url)) AS order FROM orders o INNER JOIN products_orders po ON o.id = po.order_id INNER JOIN products p ON p.id = po.product_id WHERE o.user_id = $1 GROUP BY o.id, o.order_date ORDER BY o.id;",
          [userId]
        );

        res.json(allOrders.rows);
      } catch (error) {
        res.status(500).json({ message: "Something went wrong." });
      }
    }
  },
  getPastOrderById: async (req, res) => {
    if (req.isAuthenticated()) {
      try {
        const userId = req.user.id;
        const orderId = req.params.id;
        const order = await pool.query(
          "SELECT o.id AS order_id, o.order_date, p.name AS product, po.quantity AS quantity, po.quantity * p.price AS total_cost FROM orders o INNER JOIN products_orders po ON o.id = po.order_id INNER JOIN products p ON p.id = po.product_id WHERE o.user_id = $1 AND o.id = $2",
          [userId, orderId]
        );
        res.json(order.rows[0]);
      } catch (error) {
        res.status(500).json({ message: "Something went wrong." });
      }
    }
  },
};
