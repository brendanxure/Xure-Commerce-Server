const { responsecodes } = require('../Constant/ResponseCode')
const stripe = require("stripe")(process.env.STRIPE_KEY)

const InitializeStripe = async(req, res)=> {
    console.log('ok')
    const session = await stripe.checkout.sessions.create({
        line_items: [
          {
            price_data: {
              currency: 'usd',
              product_data: {
                name: 'T-shirt',
              },
              unit_amount: 2000,
            },
            quantity: 1,
          },
        ],
        mode: 'payment',
        success_url: `${process.env.CLIENT_URL}/success`,
        cancel_url: `${process.env.CLIENT_URL}/cancel`,
      });
    
      res.redirect(session.url);
      console.log(session.url)
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