const express = require('express')
require('dotenv').config()
const cors = require('cors')
const DBConnect = require('./Config/Db')

const port = process.env.port

const app = express()

DBConnect()

app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cors())

app.listen(port, ()=> console.log(`server is running on port ${port}`))