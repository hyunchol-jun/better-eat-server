const userModel = require("../models/userModel");
const recipeModel = require("../models/recipeModel");

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
        const result = await recipeModel.setOne(req.body);
        res.json(result);
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Unable to add the recipe to the user."
        });
    }
}

module.exports = {getAllUsers, setRecipeToUser};