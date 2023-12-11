const { responsecodes } = require("../Constant/ResponseCode")
const { createCart, updateCartById, deleteCartById, findAllCart } = require("../Service/CartService")


//Create new Cart
const postCart = async(req, res)=> {
    const {userId, products} = req.body
    console.log(req.body)
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

//delete cart
const deleteCart = async(req, res)=> {
    try {
        const cart = await deleteCartById(req.params.id)
        if(!cart.success){
            res.status(cart.code).json(cart.data)
        }
        res.status(cart.code).json(cart.data)
    } catch (error) {
        res.status(responsecodes.INTERNAL_SERVER_ERROR).json(error)
    }
}

//get user cart
const getUserCart = async(req, res)=> {
    try {
        const cart = await findProductById(req.params.id)
        if(!cart.success){
            res.status(cart.code).json(cart.data)
        }
        res.status(cart.code).json(cart.data)
    } catch (error) {
        res.status(responsecodes.INTERNAL_SERVER_ERROR).json(error)
    }
}

//get all cart
const getAllCart = async(req, res)=> {
    try {
        const carts = await findAllCart()
        if(!carts.success){
            res.status(carts.code).json(carts.data)
        }
        res.status(carts.code).json(carts.data)
    } catch (error) {
        res.status(responsecodes.INTERNAL_SERVER_ERROR).json(error)
    }
}


module.exports = {
    postCart,
    cartUpdate,
    deleteCart,
    getUserCart,
    getAllCart
}