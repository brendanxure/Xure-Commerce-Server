const { responsecodes } = require("../Constant/ResponseCode")
const { createProduct } = require("../Service/ProductService")


const newProduct = async(req, res)=> {
    const {title, desc, img, categories, size, color, price} = req.body

    try {
        const product = await createProduct(title, desc, img, categories, size, color, price)
        res.status(product.code).json(product.data)
    } catch (error) {
        res.status(responsecodes.INTERNAL_SERVER_ERROR).json(error)
    }
}


module.exports = {
    newProduct
}