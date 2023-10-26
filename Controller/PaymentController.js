const { responsecodes } = require('../Constant/ResponseCode')
const stripe = require("stripe")(process.env.STRIPE_KEY)

const InitializeStripe = async(req, res)=> {
    const session = await stripe.checkout.sessions.create({
        line_items: [
          {
            price_data: {
              currency: 'usd',
              product_data: {
                name: 'Xure Commerce',
                description: 'You are making a payment of $20',
              },
              unit_amount: 2000,
            },
            quantity: 1,
          },
        ],
        mode: 'payment',
        success_url: `${process.env.CLIENT_URL}/success`,
        cancel_url: `${process.env.CLIENT_URL}/cancel`,
      }, (stripeErr, stripeRes)=> {
            if(stripeErr){
                res.status(responsecodes.INTERNAL_SERVER_ERROR).json(stripeErr)
            } else {
                console.log(stripeRes)
                res.status(responsecodes.SUCCESS).json(stripeRes.url)
            }
        });
    
      // return res.json(session.url);
    // stripe.charges.create({
    //     source:req.body.tokenId,
    //     amount:req.body.amount,
    //     currency:"usd",
    // }, (stripeErr, stripeRes)=> {
    //     if(stripeErr){
    //         res.status(responsecodes.INTERNAL_SERVER_ERROR).json(stripeErr)
    //     } else {
    //         res.status(responsecodes.SUCCESS).json(stripeRes)
    //     }
    // })
}

module.exports = {
    InitializeStripe
}