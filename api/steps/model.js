const db = require("../../data/db-config")
const { getIngredientById } = require("../ingredients/model")

function getAllSteps() {
    return db("steps")
}

function getStepById (step_id){
    const stepPromise =  db("steps as s")
        .leftJoin("ingredients as i","s.step_id","i.step_id")
        .where("s.step_id", step_id)
        .select("s.*","i.ingredient_id","i.ingredient_name","i.quantity")
        .orderBy("s.step_id")

    return stepPromise.then(steps => {

        if(steps.length == 0){
            return null
        }else{
            return {
                "step_id": steps[0].step_id,
                "recipe_id":steps[0].recipe_id,
                "step_number": steps[0].step_number,
                "instructions": steps[0].instructions,
                "ingredients": !steps[0].ingredient_id?[]:steps.map(ingredient => (
                    {
                    "ingredient_id": ingredient.ingredient_id,
                    "ingredient_name": ingredient.ingredient_name,
                    "quantity":ingredient.quantity
                    }
                ))
            }
        }
    })
}

async function createStep(step) {

    const [id] = await db("steps").insert(step)

    return await getStepById(id)
}

module.exports = {getAllSteps,getStepById,createStep}