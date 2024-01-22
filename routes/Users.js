const express = require("express");
const router = express.Router();

const usersController = require("../controllers/Users");

const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ message: "Not authenticated" });
};

router.post("/register", usersController.register);
router.post("/login", usersController.login, isAuthenticated);
router.post("/logout", usersController.logout);
router.get("/profile", isAuthenticated, usersController.profile);
router.get("/cart", isAuthenticated, usersController.getCart);
router.post("/cart", isAuthenticated, usersController.addToCart);
router.delete("/cart", isAuthenticated, usersController.removeFromCart);
router.post("/checkout", isAuthenticated, usersController.checkOut);
router.get("/orders", isAuthenticated, usersController.getPastOrders);
router.get("/order/:id", isAuthenticated, usersController.getPastOrderById);

module.exports = router;
