const knex = require("knex")(require("../knexfile"));

const setOne = (recipeInfo) => {
    return knex("recipes").insert(recipeInfo);
};

const getOne = (apiId) => {
    return knex("recipes").where({api_id: apiId});
}

module.exports = {setOne, getOne};