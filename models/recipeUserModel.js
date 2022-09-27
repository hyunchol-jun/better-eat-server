const knex = require("knex")(require("../knexfile"));

const setOne = (recipeUserInfo) => {
    return knex("recipe_user").insert(recipeUserInfo);
};

const removeOne = (recipeUserInfo) => {
    return knex("recipe_user").where(recipeUserInfo).del();
}

module.exports = {setOne, removeOne};