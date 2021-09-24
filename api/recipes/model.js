const db = require("../../data/db-config")

function getAllRecipes() {
    return db("recipes")
}

function getRecipeById(recipe_id) {
    return db("recipes").where({recipe_id}).first()
}

async function createRecipe(recipe) {
    const [id] = await db("recipes").insert(recipe)

    return getRecipeById(id)
}

module.exports = {getAllRecipes,getRecipeById,createRecipe}