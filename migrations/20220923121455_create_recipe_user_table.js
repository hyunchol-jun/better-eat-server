/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable("recipe_user", function(table) {
        table.integer("recipe_id").unsigned();
        table.integer("user_id").unsigned();
        table.foreign("recipe_id").references("recipes.id");
        table.foreign("user_id").references("users.id");
        table.timestamp("created_at").defaultTo(knex.fn.now());
        table.primary(["recipe_id", "user_id"]);
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable("recipe_user");
};
