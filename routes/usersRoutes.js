const express = require("express");
const router = express.Router();
const authenticationController = require("../controllers/authenticationController");
const userController = require("../controllers/userController");

router.route("/recipes")
        .post(authenticationController.authorize,
                userController.setRecipeToUser)
        .get(authenticationController.authorize,
            userController.getAllUserRecipes);

router.route("/recipes/:recipeId")
        .get(authenticationController.authorize,
                userController.getUserRecipe)
        .delete(authenticationController.authorize,
            userController.removeRecipeFromUser);

router.route("/groceries")
        .post(authenticationController.authorize,
                userController.setGroceryItemToUser)
        .get(authenticationController.authorize,
                userController.getAllUserGroceryItems)
        .delete(authenticationController.authorize,
                userController.deleteGroceryItemFromUser);

router.route("/checkRecipes/:recipeId")
        .get(authenticationController.authorize,
                userController.checkRecipeFromUser);
module.exports = router;