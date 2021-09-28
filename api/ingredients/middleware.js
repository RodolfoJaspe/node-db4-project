const Ingredients = require("./model")

async function checkIngredientId (req,res,next){
    const ingredient = await Ingredients.getIngredientById(req.params.ingredient_id)
    if(!ingredient){
        res.status(404).json({message:"invalid ingredient_id"})
    }else{
        req.ingredient=ingredient
        next()
    }
}

module.exports = {checkIngredientId}