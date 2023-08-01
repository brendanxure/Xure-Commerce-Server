const express = require('express')
const { postProduct, getAllProduct, getProduct, productUpdate, deleteProduct } = require('../Controller/ProductController')
const { validateTokenForAdmin, validateToken } = require('../Middleware/UserAuth')


const router = express.Router()

router.route('/').post(validateTokenForAdmin, postProduct).get(validateToken, getAllProduct)
router.route('/:id').get(validateToken, getProduct).put(validateTokenForAdmin, productUpdate).delete(validateTokenForAdmin, deleteProduct)


module.exports = router