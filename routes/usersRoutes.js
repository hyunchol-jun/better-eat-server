const express = require("express");
const router = express.Router();

const knex = require("knex")(require("../knexfile"));
const jwt = require("jsonwebtoken");
const authorize = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) 
        return res.status(401).json({
            success: false, 
            message: "This route requires authorization header."
        });

    if (authHeader.indexOf("Bearer") === -1)
        return res.status(401).json({
            success: false,
            message: "This route requires Bearer token."
        });

    const token = authHeader.split(" ")[1]; // Remove Bearer string to get the token
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401)
                    .json({ 
                        success: false,
                        message: "The token is invalid."
                    });
        } 

        req.decoded = decoded;
        next();
    });
};

const getAllUsers = (req, res) => {
    knex
        .from("users")
        .select("id", "email", "name")
        .then(userData => {
            res.json(userData);
        })
        .catch(error => {
            res.status(500).json({error});
        })
};

router.get("/", authorize, getAllUsers);

module.exports = router;