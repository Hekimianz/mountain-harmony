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
};
