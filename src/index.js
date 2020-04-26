const express = require('express')
require('./db/mongoose.js')
const userrouter = require('./routers/user.js')
const taskrouter = require('./routers/task.js')

const app = express()

app.use(express.json())
app.use(userrouter)
app.use(taskrouter)

const port = process.env.PORT


app.listen(port,() => {
    console.log("Server is up on port: " + port)
})