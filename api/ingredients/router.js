const express = require("express")
const { checkIngredientId } = require("./middleware")

const router = express.Router()

const Ingredients = require("./model")

router.get("/", (req,res) => {
    Ingredients.getAllIngredients()
        .then(ingredients => {
            res.status(200).json(ingredients)
        })
        .catch(err => {
            res.status(500).json(err)
        })    
})

router.get("/:ingredient_id", checkIngredientId, async (req,res) => {
    try{
        res.status(200).json(req.ingredient)
    }catch(err){
        res.status(500).json({message:err})
    }
})

module.exports = router