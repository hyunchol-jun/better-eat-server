const knex = require("knex")(require("../knexfile"));

const setOne = (recipeInfo) => {
    return knex("recipes").insert(recipeInfo);
};

const getOne = (recipeId) => {
    return knex("recipes").where({id: recipeId});
}

const getAll = (userId) => {
    return knex("users")
            .join("recipe_user", {"users.id": "recipe_user.user_id"})
            .join("recipes", {"recipes.id": "recipe_user.recipe_id"})
            .where({"users.id": userId})
}

module.exports = {setOne, getOne, getAll};