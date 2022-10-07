const knex = require("knex")(require("../knexfile"));

const setOne = (itemInfo) => {
    return knex("inventory_list").insert(itemInfo);
};

const getOne = (userId, itemName) => {
    return knex("inventory_list")
        .where({user_id: userId, item_name: itemName});
}

const getAll = (userId) => {
    return knex("inventory_list")
        .where({user_id: userId});
}

const removeOne = (itemId) => {
    return knex("inventory_list")
        .where({id: itemId})
        .del();
}

module.exports = {setOne, getOne, getAll, removeOne};