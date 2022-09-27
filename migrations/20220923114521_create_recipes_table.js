/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable("recipes", function(table) {
        table.integer("id").unsigned().primary();
        table.string("title").notNullable();
        table.jsonb("diets");
        table.jsonb("cuisines");
        table.text("instructions");
        table.string("image");
        table.integer("ready_min");
        table.jsonb("extendedIngredients");
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable("recipes");
};
