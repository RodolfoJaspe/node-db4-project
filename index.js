require("dotenv").config()

const port = process.env.port

const server = require("./api/server.js")

server.listen(port, () => {
    console.log(`Server running on port ${port}`)
})