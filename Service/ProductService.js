const { responsecodes } = require("../Constant/ResponseCode")
const Product = require("../Model/Product")


const createProduct = async(title, desc, img, categories, size, color, price)=> {
    try {
        const Product = await Product.create({title, desc, img, categories, size, color, price})
        return {code: responsecodes.SUCCESS, success: true, message: 'Product Successfully Created', data: Product}
    } catch (error) {
        return error
    }
}