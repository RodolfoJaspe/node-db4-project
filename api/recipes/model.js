const db = require("../../data/db-config")
const { getIngredientById } = require("../ingredients/model")

function getAllRecipes() {
    return db("recipes")
}

function getRecipeById(recipe_id) {
    const recipePromise = db("recipes as r")
        .leftJoin("steps as s","r.recipe_id","s.recipe_id")
        .leftJoin("ingredients as i","s.step_id","i.step_id")
        .where("r.recipe_id",recipe_id)
        .select("r.*","s.step_number","s.instructions","s.step_id","i.ingredient_id","i.ingredient_name","i.quantity")
        .orderBy("s.step_id")

    return recipePromise.then(recipes => {
        console.log(recipes)
        if(recipes.length == 0){
            return null
        }else {
            return {
                "recipe_id": recipes[0].recipe_id,
                "recipe_name": recipes[0].recipe_name,
                "steps": !recipes[0].step_id?[]:recipes.map(step => (
                    {
                        "step_id":step.step_id,
                        "step_number":step.step_number,
                        "instructions":step.instructions,
                        "ingredients": !step.ingredient_id?[]: 
                            {
                                "ingredient_id":step.ingredient_id,
                                "ingredient_name":step.ingredient_name,
                                "quantity":step.quantity
                            }
                    }
                ))
            }               
        }                   
    })
}                            


async function createRecipe(recipe) {
    const [id] = await db("recipes").insert(recipe)

    return getRecipeById(id)
}


module.exports = {getAllRecipes,getRecipeById,createRecipe}