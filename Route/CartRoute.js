const express = require('express')
const { postCart, cartUpdate } = require('../Controller/CartController')
const { validateToken } = require('../Middleware/UserAuth')



const router = express.Router()

router.route('/').post(validateToken, postCart)
router.route('/:id').put(validateToken, cartUpdate)