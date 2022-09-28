const knex = require("knex")(require("../knexfile"));

const setOne = (itemInfo) => {
    return knex("grocery_list").insert(itemInfo);
};

const getOne = (itemId) => {
    return knex("grocery_list").where({id: itemId});
}

const getAll = (userId) => {
    return knex("grocery_list")
        .where({user_id: userId});
}

const removeOne = (itemId) => {
    return knex("grocery_list")
        .where({id: itemId})
        .del();
}

module.exports = {setOne, getAll, removeOne, getOne};