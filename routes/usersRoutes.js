const express = require("express");
const router = express.Router();
const authenticationController = require("../controllers/authenticationController");
const userController = require("../controllers/userController");

router.get("/", authenticationController.authorize, userController.getAllUsers);

router.post("/:userId/recipes", 
            authenticationController.authorize,
            userController.setRecipeToUser);

module.exports = router;