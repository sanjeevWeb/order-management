const mongoose = require('mongoose')

const subOrderSchema = new mongoose.Schema({
    masterOrderId: { type: mongoose.Schema.Types.ObjectId, ref: 'MasterOrder' },
    vendorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    items: [{ productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' }, quantity: Number, price:Number }],
    totalAmount: Number,
},
    {
        timestamps: true
    }
)

module.exports = mongoose.model('SubOrder', subOrderSchema)