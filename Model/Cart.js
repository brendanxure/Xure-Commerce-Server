const mongoose = require('mongoose')

const CartSchema = mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    products: [
        {
            _id: {type: String},
            quantity: {type: Number, default: 1}
        }
    ], 
}, {
    timestamps: true
})

module.exports = mongoose.model('Cart', CartSchema)