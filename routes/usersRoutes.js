const express = require("express");
const router = express.Router();
const authenticationController = require("../controllers/authenticationController");
const userController = require("../controllers/userController");

router.get("/", authenticationController.authorize, userController.getAllUsers);

module.exports = router;