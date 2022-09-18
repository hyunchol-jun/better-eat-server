const express = require("express");
const router = express.Router();
const authenticationController = require("../controllers/authenticationController");

const knex = require("knex")(require("../knexfile"));
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

router.get("/", authenticationController.authorize, getAllUsers);

module.exports = router;