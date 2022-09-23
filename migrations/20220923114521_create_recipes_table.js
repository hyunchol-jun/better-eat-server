/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable("recipes", function(table) {
        table.increments("id");
        table.string("title").notNullable();
        table.integer("api_id").notNullable().unique();
        table.jsonb("diets");
        table.jsonb("cuisines");
        table.text("instructions");
        table.string("image");
        table.integer("ready_min");
        table.jsonb("ingredients");
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable("recipes");
};
