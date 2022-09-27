const userModel = require("../models/userModel");
const recipeModel = require("../models/recipeModel");
const recipeUserModel = require("../models/recipeUserModel");
const groceryListModel = require("../models/groceryListModel");

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
                message: "Unable to identify the user."
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
};

const getAllUserRecipes = async (req, res) => {
    try {
        const foundUser = await userModel.getOne({email: req.decoded.email});

        if (foundUser.length !== 1) {
            return res.status(500).json({
                success: false,
                message: "Unable to identify the user."
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
};

const getUserRecipe = async (req, res) => {
    try {
        const foundUser = await userModel.getOne({email: req.decoded.email});
        if (foundUser.length !== 1) {
            return res.status(500).json({
                success: false,
                message: "Unable to identify the user."
            });
        }

        const foundRecipe = await recipeModel.getOne(req.params.recipeId);
        if (foundRecipe.length !== 1) {
            return res.status(404).json({
                success: false,
                message: "Recipe not found."
            });
        }

        res.json(foundRecipe[0]);
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error
        });
    }
}

const setGroceryItemToUser = async (req, res) => {
    try {
        const foundUser = await userModel.getOne({email: req.decoded.email});

        if (foundUser.length !== 1) {
            return res.status(500).json({
                success: false,
                message: "Unable to identify the user."
            });
        }

        await groceryListModel.setOne({
            user_id: foundUser[0].id,
            item_name: req.body.itemName
        });
        res.json(req.body);

    } catch (error) {
        if (error.code === "ER_DUP_ENTRY") {
            return res.status(400).json({
                success: false,
                message: "Already saved"
            })
        }
        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};

const getAllUserGroceryItems = async (req, res) => {
    try {
        const foundUser = await userModel.getOne({email: req.decoded.email});

        if (foundUser.length !== 1) {
            return res.status(500).json({
                success: false,
                message: "Unable to identify the user."
            });
        }

        const groceryItems = await groceryListModel.getAll(foundUser[0].id);
        
        res.json(groceryItems);
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error
        });
    }
};

const deleteGroceryItemFromUser = async (req, res) => {
    try {
        const foundUser = await userModel.getOne({email: req.decoded.email});

        if (foundUser.length !== 1) {
            return res.status(500).json({
                success: false,
                message: "Unable to identify the user."
            });
        }

        await groceryListModel.removeOne(req.body.id)
        res.json(req.body);
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error
        });
    }
};

module.exports = {
    getAllUsers, 
    setRecipeToUser, 
    getAllUserRecipes, 
    getUserRecipe,
    setGroceryItemToUser,
    getAllUserGroceryItems,
    deleteGroceryItemFromUser
};