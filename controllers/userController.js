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
        const foundRecipe = await recipeModel.getOne(req.body.api_id);
        const foundUser = await userModel.getOne({email: req.decoded.email});
        console.log(req.decoded)

        if (foundRecipe.length !== 1 || foundUser.length !== 1) {

            return res.status(500).json({
                success: false,
                message: "Unable to set the recipe to the user."
            });
        }

        await recipeUserModel.setOne({
            recipe_id: foundRecipe[0].id,
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

module.exports = {getAllUsers, setRecipeToUser};