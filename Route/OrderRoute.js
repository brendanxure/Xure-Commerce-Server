const express = require('express')
const { postOrder, orderUpdate, deleteOrder, getUserOrder, getAllOrder, getMonthlyIncome } = require('../Controller/OrderController')
const { validateToken, validateTokenForAdmin } = require('../Middleware/UserAuth')

const router = express.Router()

router.route('/').post( postOrder).get( getAllOrder)
router.route('/:id').put(validateTokenForAdmin, orderUpdate).delete(validateTokenForAdmin, deleteOrder).get(validateTokenForAdmin, getUserOrder )
router.get("/monthly-income", validateTokenForAdmin, getMonthlyIncome)

module.exports = router