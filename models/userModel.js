const knex = require("knex")(require("../knexfile"));

const getAll = () => {
    return knex.from("users").select("id", "email", "name");
}

const setOne = (userInfo) => {
    return knex("users").insert(userInfo);
}

const getOne = (userInfo) => {
    return knex("users").where(userInfo);
}

module.exports = {getAll, setOne, getOne};