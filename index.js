const express = require('express')
require('dotenv').config()
const cors = require('cors')
const DBConnect = require('./Config/Db')

const port = process.env.PORT

const app = express()

DBConnect()

app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cors())

app.use(('/api/user'), require('./Route/UserRoute'))
app.use(('/api/product'), require('./Route/ProductRoute'))
app.use(('/api/cart'), require('./Route/CartRoute'))
app.use(('/api/order'), require('./Route/OrderRoute'))
app.use(('/api/payment'), require('./Route/PaymentRoute'))

app.listen(port, ()=> console.log(`server is running on port ${port}`))