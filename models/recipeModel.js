const knex = require("knex")(require("../knexfile"));

const setOne = (recipeInfo) => {
    return knex("recipes").insert(recipeInfo);
};

module.exports = {setOne};