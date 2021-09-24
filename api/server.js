const express = require("express")

const server = express()

const recipeRouter = require("./recipes/router")

server.use(express.json())

server.use("/api/recipes",recipeRouter)

module.exports = server