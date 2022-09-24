const userModel = require("../models/userModel");
const recipeModel = require("../models/recipeModel");
const recipeUserModel = require("../models/recipeUserModel");

const getAllUsers = async (req, res) => {
    try {
        const users = await userModel.getAll();
        res.json(users); 
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Unable to retrieve users data."
        });
    }
};

const setRecipeToUser = async (req, res) => {
    try {
        await recipeModel.setOne(req.body);
        const foundUser = await userModel.getOne({email: req.decoded.email});

        if (foundUser.length !== 1) {

            return res.status(500).json({
                success: false,
                message: "Unable to set the recipe to the user."
            });
        }

        await recipeUserModel.setOne({
            recipe_id: req.body.id,
            user_id: foundUser[0].id
        })

        res.json(req.body);
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error
        });
    }
}

const getAllUserRecipes = async (req, res) => {
    try {
        const foundUser = await userModel.getOne({email: req.decoded.email});

        if (foundUser.length !== 1) {

            return res.status(500).json({
                success: false,
                message: "Unable to fetch user's recipes data."
            });
        }

        const foundRecipes = await recipeModel.getAll(foundUser[0].id);
        res.json(foundRecipes);
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error
        });
    }
}

module.exports = {getAllUsers, setRecipeToUser, getAllUserRecipes};