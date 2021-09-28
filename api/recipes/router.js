const express = require("express")

const router = express.Router()
const {checkRecipeId,checkRecipeBody} = require("./middleware")
const Recipes = require("./model.js")
const Steps = require("../steps/model")


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

// router.get("/:recipe_id/steps", (req, res) => {
//     Steps.getAllSteps()
//         .then(steps => {
//             res.status(200).json(steps)
//         })
//         .catch(err => {
//             res.status(500).json(err)
//         })
// })

// router.get("/:recipe_id/steps/:step_id", async (req,res) => {
//     const {step_id} = req.params
//     try{
//         const step = await Steps.getStepById(step_id)
//         res.status(200).json(step)
//     }catch(err){
//         res.status(500).json({message: err})
//     }
// })

router.post("/:recipe_id/steps/", async (req,res) => {
    const newStep = {...req.body, "recipe_id": req.params.recipe_id}
    Steps.createStep(newStep)
        .then(step => {
            res.status(201).json(step)
        })
        .catch(err => {
            res.status(500).json({message:err})
        })  
})

module.exports = router