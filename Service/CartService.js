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

// const deleteProductById = async(productId)=> {
//     try {
//         const product = await Product.findByIdAndDelete(productId)
//         if(!product){
//             return {code: responsecodes.NOT_FOUND, success: false, data: 'Product not found'}
//         }
//         return {code: responsecodes.SUCCESS, success: true, data: 'Product Deleted'}
//     } catch (error) {
//         return error
//     }
// }

// const findProductById = async(productId)=> {
//     try {
//         const product = await Product.findById(productId)
//         if(!product){
//             return {code: responsecodes.NOT_FOUND, success: false, data: 'Product not found'}
//         }
//         return {code: responsecodes.SUCCESS, success: true, data: product}
//     } catch (error) {
//         return error
//     }
// }

// const findAllProduct = async(category, query)=> {
//     try {
//         let products;
//         if(!category){
//             products = await Product.find().sort({createdAt: -1}).limit(5)
//         }else if(category){
//             products = await Product.find({categories: {$in: [query]}})
//         } else {
//             products = await Product.find()
//         }
//         if(!products){
//         return {code: responsecodes.NOT_FOUND, success: false, data: 'No Product Found'}
//         }
//         return {code: responsecodes.SUCCESS, success: true, data: products}
//     } catch (error) {
//         return error   
//     }
// }



module.exports = {
    createCart,
    findAllProduct,
    updateCartById,
    deleteProductById,
    findProductById
}