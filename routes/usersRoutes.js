const express = require("express");
const router = express.Router();
const authenticationController = require("../controllers/authenticationController");
const userController = require("../controllers/userController");

router.get("/", authenticationController.authorize, userController.getAllUsers);

router.route("/recipes")
        .post(authenticationController.authorize,
                userController.setRecipeToUser)
        .get(authenticationController.authorize,
            userController.getAllUserRecipes);

router.route("/groceries")
        .post(authenticationController.authorize,
                userController.setGroceryItemToUser);

module.exports = router;