const express = require("express")

const router = express.Router()
const {checkRecipeId,checkRecipeBody} = require("./middleware")
const Recipes = require("./model.js")

router.get("/",(req, res) => {
    Recipes.getAllRecipes()
        .then(recipes => {
            res.status(200).json(recipes)
        })
        .catch(err => {
            res.status(500).json({message: err})
        })
})

router.get("/:recipe_id", checkRecipeId, async (req,res) => {
   try{
       res.status(200).json(req.recipe)
   }catch(err){
       res.status(500).json({message: err})
   }
})

router.post("/", checkRecipeBody, async (req,res) => {
    try{
        const newRecipe = await Recipes.createRecipe(req.body)
        res.status(201).json(newRecipe)
    }catch(err){
        res.status(500).json({message: err})
    }
})

module.exports = router