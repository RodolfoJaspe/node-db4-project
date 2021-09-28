const db = require("../../data/db-config")

function getAllIngredients() {
    return db("ingredients")
}

function getIngredientById (ingredient_id){
    const ingredientPromise =  db("ingredients as i")
        .where({ingredient_id})
        .select("i.*")

    return ingredientPromise.then(ingredient => {
        if(ingredient.length == 0){
            return null
        }else{ 
                return {
                "ingredient_id": ingredient[0].ingredient_id,
                "ingredient_name":ingredient[0].ingredient_name,
                "quantity": ingredient[0].quantity,
                "step_id":ingredient[0].step_id
                }
            }  
    })
}

async function createIngredient(ingredient) {

    const [id] = await db("ingredients").insert(ingredient)

    return await getIngredientById(id)
}

module.exports = {getAllIngredients,getIngredientById,createIngredient}