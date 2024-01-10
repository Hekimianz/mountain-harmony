const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const pool = require("./models/db"); // Your database connection

function initialize(passport) {
  const authenticateUser = async (email, password, done) => {
    try {
      const userCheck = await pool.query(
        "SELECT * FROM users WHERE email = $1",
        [email]
      );

      if (userCheck.rows.length === 0) {
        return done(null, false, { message: "No user with that email found." });
      }

      const user = userCheck.rows[0];
      if (await bcrypt.compare(password, user.password)) {
        return done(null, user);
      } else {
        return done(null, false, { message: "Incorrect password." });
      }
    } catch (error) {
      return done(error);
    }
  };

  passport.use(new LocalStrategy({ usernameField: "email" }, authenticateUser));

  passport.serializeUser((user, done) => done(null, user.id));

  passport.deserializeUser(async (id, done) => {
    try {
      const userById = await pool.query("SELECT * FROM users WHERE id = $1", [
        id,
      ]);
      done(null, userById.rows[0]);
    } catch (error) {
      done(error, null);
    }
  });
}

module.exports = initialize;
