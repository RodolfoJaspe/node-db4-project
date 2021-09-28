const express = require("express")

const router = express.Router()

const Steps = require("./model")
const Ingredients = require("../ingredients/model")

router.get("/", (req,res) => {
    Steps.getAllSteps()
        .then(steps => {
            res.status(200).json(steps)
        })
        .catch(err => {
            res.status(500).json({message: err})
        })
})

router.get("/:step_id", async (req,res) => {
    const {step_id} = req.params
    // console.log(`${step_id} from step router`)
    try{
        const step = await Steps.getStepById(step_id)
        res.status(200).json(step)
    }catch(err){
        res.status(500).json({message: err})
    }
})

router.post("/:step_id/ingredients", (req,res) => {
    const newIngredient = {...req.body, "step_id": req.params.step_id}
    Ingredients.createIngredient(newIngredient)
        .then(ingredient => {
            res.status(201).json(ingredient)
        })
        .catch(err => {
            res.status(500).json({message:err})
        })    
})

module.exports = router