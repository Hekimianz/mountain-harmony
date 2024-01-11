const express = require("express");
const router = express.Router();

const usersController = require("../controllers/Users");

router.post("/register", usersController.register);
router.post("/login", usersController.login);
router.post("/logout", usersController.logout);
router.get("/profile", usersController.profile);
router.get("/cart", usersController.getCart);
router.post("/cart", usersController.addToCart);
router.delete("/cart", usersController.removeFromCart);
router.post("/checkout", usersController.checkOut);
router.get("/orders", usersController.getPastOrders);
router.get("/order/:id", usersController.getPastOrderById);

module.exports = router;
