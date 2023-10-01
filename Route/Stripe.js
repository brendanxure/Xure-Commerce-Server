const { InitializeStripe } = require('../Controller/StripeController')

const router = require('express').Router()


router.post("/payment", InitializeStripe)

module.exports = router 