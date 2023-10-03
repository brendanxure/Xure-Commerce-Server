const { responsecodes } = require('../Constant/ResponseCode')
const stripe = require("stripe")(process.env.STRIPE_KEY)

const InitializeStripe = async(req, res)=> {
    stripe.charges.create({
        source:req.body.tokenId,
        amount:req.body.amount,
        currency:"usd",
    }, (stripeErr, stripeRes)=> {
        if(stripeErr){
            res.status(responsecodes.INTERNAL_SERVER_ERROR).json(stripeErr)
        } else {
            res.status(responsecodes.SUCCESS).json(stripeRes)
        }
    })
}

module.exports = {
    InitializeStripe
}