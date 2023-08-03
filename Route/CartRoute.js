const express = require('express')
const { postCart, cartUpdate, deleteCart, getUserCart, getAllCart } = require('../Controller/CartController')
const { validateToken, validateTokenForAdmin } = require('../Middleware/UserAuth')



const router = express.Router()

router.route('/').post(validateToken, postCart).get(validateTokenForAdmin, getAllCart)
router.route('/:id').put(validateToken, cartUpdate).delete(validateToken, deleteCart).get(validateToken, getUserCart)

module.exports = router