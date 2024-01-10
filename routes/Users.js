const express = require("express");
const router = express.Router();

const usersController = require("../controllers/Users");

router.post("/register", usersController.register);
router.post("/login", usersController.login);
router.post("/logout", usersController.logout);
router.get("/profile", usersController.profile);
router.get("/cart", usersController.getCart);
router.post("/cart", usersController.addToCart);

module.exports = router;
