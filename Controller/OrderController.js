const { responsecodes } = require("../Constant/ResponseCode")
const { createOrder, updateOrderById, deleteOrderById, findOrderByUser, findAllOrder, findMonthlyIncome } = require("../Service/OrderService")


//Create new Order
const postOrder = async(req, res)=> {
    const {userId, products, total, address, status} = req.body
    console.log(req.body)
    try {
        const order = await createOrder(userId, products, total, address, status)
        res.status(order.code).json(order.data)
    } catch (error) {
        res.status(responsecodes.INTERNAL_SERVER_ERROR).json(error)
    }
}

//update Order
const orderUpdate = async(req, res)=> {
    try {
        const order = await updateOrderById(req.params.id, req.body)
        if(!order.success){
            res.status(order.code).json(order.data)
        }
        res.status(order.code).json(order.data)
    } catch (error) {
        res.status(responsecodes.INTERNAL_SERVER_ERROR).json(error)
    }

}

//delete order
const deleteOrder = async(req, res)=> {
    try {
        const order = await deleteOrderById(req.params.id)
        if(!order.success){
            res.status(order.code).json(order.data)
        }
        res.status(order.code).json(order.data)
    } catch (error) {
        res.status(responsecodes.INTERNAL_SERVER_ERROR).json(error)
    }
}

//get user order
const getUserOrder = async(req, res)=> {
    try {
        const order = await findOrderByUser(req.params.id)
        if(!order.success){
            res.status(order.code).json(order.data)
        }
        res.status(order.code).json(order.data)
    } catch (error) {
        res.status(responsecodes.INTERNAL_SERVER_ERROR).json(error)
    }
}

//get all order
const getAllOrder = async(req, res)=> {
    try {
        const orders = await findAllOrder()
        if(!orders.success){
            res.status(orders.code).json(orders.data)
        }
        res.status(orders.code).json(orders.data)
    } catch (error) {
        res.status(responsecodes.INTERNAL_SERVER_ERROR).json(error)
    }
}

//get monthly income
const getMonthlyIncome = async(req, res)=> {
    try {
        const monthlyIncome = await findMonthlyIncome()
        if(!monthlyIncome.success){
            res.status(monthlyIncome.code).json(monthlyIncome.data)
        }
        res.status(monthlyIncome.code).json(monthlyIncome.data)
    } catch (error) {
        res.status(responsecodes.INTERNAL_SERVER_ERROR).json(error)
    }
}


module.exports = {
    postOrder,
    orderUpdate,
    deleteOrder,
    getUserOrder,
    getAllOrder,
    getMonthlyIncome
}
