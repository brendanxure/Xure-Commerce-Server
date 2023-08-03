const { responsecodes } = require("../Constant/ResponseCode")
const Cart = require("../Model/Cart")


const createCart = async(userId, products)=> {
    try {
        const cart = await Cart.create({userId, products})
        return {code: responsecodes.SUCCESS, success: true, message: 'Cart Successfully Created', data: cart}
    } catch (error) {
        return error
    }
}

const updateCartById = async(cartId, body)=> {
    try {
        const updatedCart = await Cart.findByIdAndUpdate(cartId, {$set: body}, {new: true})
        if(!updatedCart){
            return {code: responsecodes.NOT_FOUND, success: false, data: 'Cart not found'}
        }
        return {code: responsecodes.SUCCESS, success: true, data: updatedCart}
    } catch (error) {
        return error
    }
}

const deleteCartById = async(cartId)=> {
    try {
        const cart = await Cart.findByIdAndDelete(cartId)
        if(!cart){
            return {code: responsecodes.NOT_FOUND, success: false, data: 'Cart not found'}
        }
        return {code: responsecodes.SUCCESS, success: true, data: 'Cart Deleted'}
    } catch (error) {
        return error
    }
}

const findCartById = async(cartUserId)=> {
    try {
        const cart = await Cart.findOne({ userId: cartUserId })
        if(!cart){
            return {code: responsecodes.NOT_FOUND, success: false, data: 'Cart not found'}
        }
        return {code: responsecodes.SUCCESS, success: true, data: cart}
    } catch (error) {
        return error
    }
}

const findAllCart = async()=> {
    try {
        const carts = await Cart.find()
        if(!carts){
        return {code: responsecodes.NOT_FOUND, success: false, data: 'No Cart Found'}
        }
        return {code: responsecodes.SUCCESS, success: true, data: carts}
    } catch (error) {
        return error   
    }
}



module.exports = {
    createCart,
    findAllCart,
    updateCartById,
    deleteCartById,
    findCartById
}