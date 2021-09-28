
exports.up = function(knex) {
    return knex.schema
    .createTable("recipes", tbl => {
        tbl.increments("recipe_id")
        tbl.string("recipe_name",128)
            .notNullable()
            .unique();
    })
    .createTable("steps", tbl =>{
        tbl.increments("step_id")
        tbl.integer("step_number")
            .notNullable()
            .unsigned()
        tbl.string("instructions")
            .notNullable()
            .unique()
        tbl.integer("recipe_id")
            .notNullable()
            .references("recipe_id")
            .inTable("recipes")
            .onDelete("RESTRICT")
    })
    .createTable("ingredients", tbl => {
        tbl.increments("ingredient_id")
        tbl.string("ingredient_name", 128)
            .unique()
        tbl.integer("step_id")
            .notNullable()
            .references("step_id")
            .inTable("steps")
            .onDelete("RESTRICT")
        tbl.string("quantity", 128)
            .notNullable()
    })
};

exports.down = function(knex) {
    return knex.schema
        .dropTableIfExists("ingredients")
        .dropTableIfExists("steps")
        .dropTableIfExists("recipes")
};
