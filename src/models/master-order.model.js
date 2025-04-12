const mongoose = require('mongoose')

const masterOrderSchema = new mongoose.Schema({
    customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    items: [{ productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' }, quantity: Number, price: Number }],
    totalAmount: Number,
    subOrders: [{ type: mongoose.Schema.Types.ObjectId, ref: 'SubOrders' }]
},
    {
        timestamps: true
    }
)

module.exports = mongoose.model('MasterOrder', masterOrderSchema)