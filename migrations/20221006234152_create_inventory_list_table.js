/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable("inventory_list", function(table) {
        table.increments("id");
        table.integer("user_id").unsigned().notNullable();
        table.foreign("user_id").references("users.id");
        table.string("item_name").notNullable();
        table.timestamp("created_at").defaultTo(knex.fn.now());
        table.unique(["user_id", "item_name"]);
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable("inventory_list");
};
