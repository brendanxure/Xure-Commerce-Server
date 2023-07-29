const { responsecodes } = require("../Constant/ResponseCode")
const Product = require("../Model/Product")


const createProduct = async(title, desc, img, categories, size, color, price)=> {
    try {
        const product = await Product.create({title, desc, img, categories, size, color, price})
        return {code: responsecodes.SUCCESS, success: true, message: 'Product Successfully Created', data: product}
    } catch (error) {
        return error
    }
}

const findAllProduct = async()=> {
    try {
        const products = await Product.find()
        return {code: responsecodes.SUCCESS, success: true, message: 'Product Successfully Created', data: products}
    } catch (error) {
        return error   
    }
}


module.exports = {
    createProduct,
    findAllProduct
}