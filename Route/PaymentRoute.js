const { InitializeStripe } = require('../Controller/PaymentController')

const router = require('express').Router()


router.post("/stripe", InitializeStripe)

module.exports = router 