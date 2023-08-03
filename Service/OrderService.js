const { responsecodes } = require("../Constant/ResponseCode")
const Order = require("../Model/Order")


const createOrder = async(userId, products, amount, address, status)=> {
    try {
        const order = await Order.create({userId, products, amount, address, status})
        return {code: responsecodes.SUCCESS, success: true, message: 'Order Successfully Created', data: order}
    } catch (error) {
        return error
    }
}

const updateOrderById = async(OrderId, body)=> {
    try {
        const updatedOrder = await Order.findByIdAndUpdate(OrderId, {$set: body}, {new: true})
        if(!updatedOrder){
            return {code: responsecodes.NOT_FOUND, success: false, data: 'Order not found'}
        }
        return {code: responsecodes.SUCCESS, success: true, data: updatedOrder}
    } catch (error) {
        return error
    }
}

const deleteOrderById = async(orderId)=> {
    try {
        const order = await Order.findByIdAndDelete(orderId)
        if(!order){
            return {code: responsecodes.NOT_FOUND, success: false, data: 'Order not found'}
        }
        return {code: responsecodes.SUCCESS, success: true, data: 'Order Deleted'}
    } catch (error) {
        return error
    }
}

const findOrderByUser = async(orderUserId)=> {
    try {
        const order = await Order.find({ userId: orderUserId })
        if(!order){
            return {code: responsecodes.NOT_FOUND, success: false, data: 'Order not found'}
        }
        return {code: responsecodes.SUCCESS, success: true, data: order}
    } catch (error) {
        return error
    }
}

const findAllOrder = async()=> {
    try {
        const orders = await Order.find()
        if(!orders){
        return {code: responsecodes.NOT_FOUND, success: false, data: 'No Order Found'}
        }
        return {code: responsecodes.SUCCESS, success: true, data: orders}
    } catch (error) {
        return error   
    }
}

const findMonthlyIncome = async()=> {
    const date = new Date()
    const lastMonth = new Date(date.setMonth(date.getMonth()- 1))
    // const previousMonth = new Date(date.setMonth(date.getMonth()- 2))
   const previousMonth =  new Date(date.setMonth(lastMonth.getMonth()- 1))

    try {
        const data = await Order.aggregate([
            { $match: { createdAt: {$gte: previousMonth}}},
            {
                $project: {
                    month: {$month: "$createdAt"},
                    sales: "$amount" 
                }
            },
            { 
                $group: {
                    _id: "$month",
                    total: {$sum: "$sales"}
                }
            }
        ])
        if(!data){
        return {code: responsecodes.NOT_FOUND, success: false, data: 'No Monthly Income found'}  
        }
        return {code: responsecodes.SUCCESS, success: true, data: data}
    } catch (error) {
        return error
    }
}



module.exports = {
    createOrder,
    findAllOrder,
    updateOrderById,
    deleteOrderById,
    findOrderByUser,
    findMonthlyIncome
}