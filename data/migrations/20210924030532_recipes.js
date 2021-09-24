
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
        tbl.string("instructions")
            .notNullable()
            .unique()
        tbl.integer("recipe_id")
            .notNullable()
            .unique()
            .references("recipe_id")
            .inTable("recipes")
            .onDelete("RESTRICT")
    })
    .createTable("ingredients", tbl => {
        tbl.increments("ingredient_id")
        tbl.string("ingredient_name", 128)
            .notNullable()
            .unique()
        tbl.integer("step_id")
            .notNullable()
            .unique()
            .references("step_id")
            .inTable("steps")
            .onDelete("RESTRICT")
    })
    .createTable("quantities", tbl => {
        tbl.increments("quantity_id")
        tbl.string("quantity", 128)
            .notNullable()
        tbl.integer("ingredient_id")
            .unique()
            .notNullable()
            .references("ingredient_id")
            .inTable("ingredients")
            .onDelete("RESTRICT")   
    })
};

exports.down = function(knex) {
  
};
