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

module.exports = {getAllUsers};