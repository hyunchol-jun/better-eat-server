const knex = require("knex")(require("../knexfile"));

const setOne = (itemInfo) => {
    return knex("grocery_list").insert(itemInfo);
};

const getAll = (userId) => {
    return knex("grocery_list")
        .where({user_id: userId});
}

const removeOne = (userId, itemName) => {
    return knex("grocery_list")
        .where({user_id: userId})
        .andWhere({item_name: itemName})
        .del();
}

module.exports = {setOne, getAll, removeOne};