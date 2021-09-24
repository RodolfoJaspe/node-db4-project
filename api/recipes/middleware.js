const Recipes = require("./model")

async function checkRecipeId (req,res,next) {
    const {recipe_id} = req.params
    const recipe = await Recipes.getRecipeById(recipe_id)
    if(!recipe){
        res.status(404).json({message: `No recipe with id of ${recipe_id}`})
    }else{
        req.recipe = recipe
        next()
    }
}

function checkRecipeBody (req,res,next) {
    const {recipe_name} = req.body
    if(!recipe_name){
        res.status(400).json({message:"recipe_name is required"})
    } else if (typeof recipe_name != "string"){
        res.status(400).json({message:"recipe_name must be a string"})
    } else {
        next()
    }
}

module.exports = {checkRecipeId,checkRecipeBody}