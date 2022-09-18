const userModel = require("../models/userModel");

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

module.exports = {getAllUsers};