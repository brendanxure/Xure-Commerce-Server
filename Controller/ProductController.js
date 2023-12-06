const { responsecodes } = require("../Constant/ResponseCode")
const { createProduct, updateProductById, deleteProductById, findAllProduct, findProductById } = require("../Service/ProductService")

//Create new product
const postProduct = async(req, res)=> {
    const {title, desc, img, categories, size, color, price} = req.body

    try {
        const product = await createProduct(title, desc, img, categories, size, color, price)
        res.status(product.code).json(product.data)
    } catch (error) {
        res.status(responsecodes.INTERNAL_SERVER_ERROR).json(error)
    }
}

//update product
const productUpdate = async(req, res)=> {
    try {
        const product = await updateProductById(req.params.id, req.body)
        if(!product.success){
            res.status(product.code).json(product.data)
        }
        res.status(product.code).json(product.data)
    } catch (error) {
        res.status(responsecodes.INTERNAL_SERVER_ERROR).json(error)
    }

}

//delete product
const deleteProduct = async(req, res)=> {
    try {
        const product = await deleteProductById(req.params.id)
        if(!product.success){
            res.status(product.code).json(product.data)
        }
        res.status(product.code).json(product.data)
    } catch (error) {
        res.status(responsecodes.INTERNAL_SERVER_ERROR).json(error)
    }
}

//get product
const getProduct = async(req, res)=> {
    try {
        const product = await findProductById(req.params.id)
        if(!product.success){
            res.status(product.code).json(product.data)
        }
        res.status(product.code).json(product.data)
    } catch (error) {
        res.status(responsecodes.INTERNAL_SERVER_ERROR).json(error)
    }
}

//get All Products
const getAllProduct = async(req, res)=> {
    const qNew = req.query.new
    const qCategory = req.query.category
    const category = true
    try {
        let products;
        if(qNew) {
            products = await findAllProduct(!category, qNew)
            console.log(products)
        } else if(qCategory){
            products = await findAllProduct(category, qCategory)
        } else {
            products = await findAllProduct()
        }
        if(!products.success){
            res.status(products.code).json(products.data)
        }
        res.status(products.code).json(products.data)
    } catch (error) {
        res.status(responsecodes.INTERNAL_SERVER_ERROR).json(error)
    }
}

module.exports = {
    postProduct,
    productUpdate,
    deleteProduct,
    getAllProduct,
    getProduct
}