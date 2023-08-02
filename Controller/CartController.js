const { responsecodes } = require("../Constant/ResponseCode")
const { createCart, updateCartById } = require("../Service/CartService")


//Create new Cart
const postCart = async(req, res)=> {
    const {userId, products} = req.body

    try {
        const cart = await createCart(userId, products)
        res.status(cart.code).json(cart.data)
    } catch (error) {
        res.status(responsecodes.INTERNAL_SERVER_ERROR).json(error)
    }
}

//update Cart
const cartUpdate = async(req, res)=> {
    try {
        const cart = await updateCartById(req.params.id, req.body)
        if(!cart.success){
            res.status(cart.code).json(cart.data)
        }
        res.status(cart.code).json(cart.data)
    } catch (error) {
        res.status(responsecodes.INTERNAL_SERVER_ERROR).json(error)
    }

}


module.exports = {
    postCart,
    cartUpdate
}