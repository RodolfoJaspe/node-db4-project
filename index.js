require("dotenv").config()

const port = process.env.PORT

const server = require("./api/server.js")

server.listen(port, () => {
    console.log(`Server running on port ${port}`)
})