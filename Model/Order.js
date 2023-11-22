const mongoose = require('mongoose')

const OrderSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    products: [
        {
            _id: {
                type: mongoose.Schema.Types.ObjectId,
                required: true,
                ref: 'Product'
            },
            quantity: {
                type: Number, 
                default: 1
            }
        }
    ], 
    amount: {
        type: Number, 
        required: true
    },
    address: {
        type: Object, 
    },
    status: {
        type: String, 
        default: "pending"
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Order', OrderSchema)