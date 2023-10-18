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

const updateProductById = async(productId, body)=> {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(productId, {$set: body}, {new: true})
        if(!updatedProduct){
            return {code: responsecodes.NOT_FOUND, success: false, data: 'Product not found'}
        }
        return {code: responsecodes.SUCCESS, success: true, data: updatedProduct}
    } catch (error) {
        return error
    }
}

const deleteProductById = async(productId)=> {
    try {
        const product = await Product.findByIdAndDelete(productId)
        if(!product){
            return {code: responsecodes.NOT_FOUND, success: false, data: 'Product not found'}
        }
        return {code: responsecodes.SUCCESS, success: true, data: 'Product Deleted'}
    } catch (error) {
        return error
    }
}

const findProductById = async(productId)=> {
    try {
        const product = await Product.findById(productId)
        if(!product){
            return {code: responsecodes.NOT_FOUND, success: false, data: 'Product not found'}
        }
        return {code: responsecodes.SUCCESS, success: true, data: product}
    } catch (error) {
        return error
    }
}

const findAllProduct = async(category, query)=> {
    try {
        let products;
        if(!category){
            products = await Product.find().sort({createdAt: -1}).limit(8)
        }else if(category){
            products = await Product.find({categories: {$in: [query]}})
        } else {
            products = await Product.find()
        }
        if(!products){
        return {code: responsecodes.NOT_FOUND, success: false, data: 'No Product Found'}
        }
        return {code: responsecodes.SUCCESS, success: true, data: products}
    } catch (error) {
        return error   
    }
}



module.exports = {
    createProduct,
    findAllProduct,
    updateProductById,
    deleteProductById,
    findProductById
}