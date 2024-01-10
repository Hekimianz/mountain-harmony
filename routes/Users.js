const express = require("express");
const router = express.Router();

const usersController = require("../controllers/Users");

router.post("/register", usersController.register);

module.exports = router;
