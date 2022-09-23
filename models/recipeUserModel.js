const knex = require("knex")(require("../knexfile"));

const setOne = (recipeUserInfo) => {
    return knex("recipe_user").insert(recipeUserInfo);
};

module.exports = {setOne};