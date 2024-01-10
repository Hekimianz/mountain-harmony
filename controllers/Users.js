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
        res.status(201).json(userData);
      } catch (error) {
        res.status(500).json({ error: "Internal server error" });
      }
    },
  ],

  login: [
    passport.authenticate("local"),
    (req, res) => {
      res.json({ message: "Logged in succesfully" });
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
    if (req.isAuthenticated()) {
      const userData = { ...req.user };
      delete userData.password;
      res.json(userData);
    } else {
      res.status(401).json({ message: "Not authenticated" });
    }
  },

  getCart: async (req, res) => {
    if (req.isAuthenticated()) {
      try {
        const userId = req.user.id;
        const usersCart = await pool.query(
          "SELECT u.name AS UserName, p.id AS ProductID, p.name AS ProductName, p.description, p.price, p.category, p.image_url FROM  users u INNER JOIN carts c ON u.id = c.user_id INNER JOIN carts_products cp ON c.id = cp.cart_id INNER JOIN products p ON cp.product_id = p.id WHERE u.id = $1;",
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
        const productId = req.body.productId;
        const cartResult = await pool.query(
          "SELECT id FROM carts WHERE user_id = $1",
          [userId]
        );
        const cartId = cartResult.rows[0].id;
        await pool.query(
          "INSERT INTO carts_products (cart_id, product_id) VALUES ($1, $2)",
          [cartId, productId]
        );
        res.json({ message: "Product added to cart successfully" });
      } catch (error) {
        res.status(500).json({ message: "Something went wrong" });
      }
    } else {
      res.status(401).json({ message: "Not authenticated" });
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
};
