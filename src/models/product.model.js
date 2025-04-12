const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    stock: {
        type: Number,
        required: true
    },
    vendorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    category: {
        type: String,
        default: 'general'
    },
}, {
    timestamps: true
})

module.exports = mongoose.model('Product', productSchema)