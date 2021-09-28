const express = require("express")

const server = express()

const recipeRouter = require("./recipes/router")
const stepRouter = require("./steps/router")
const ingredientRouter = require("./ingredients/router")

server.use(express.json())

server.use("/api/recipes",recipeRouter)
server.use("/api/steps", stepRouter)
server.use("/api/ingredients", ingredientRouter)

module.exports = server