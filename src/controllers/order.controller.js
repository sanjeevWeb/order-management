const masterOrderModel = require("../models/master-order.model");
const productModel = require("../models/product.model");
const mongoose = require('mongoose');
const subOrderModel = require("../models/sub-order.model");

const placeOrder = async (req, res, next) => {
    const session = await mongoose.startSession();
    try {
        const customerId = req.user._id;
        const { items } = req.body; // [{ productId, quantity }] from frontend

        // Fetch product details and validate stock
        const productIds = items.map(i => i.productId);
        const products = await productModel.find({ _id: { $in: productIds } }).session(session);

        const vendorMap = new Map();
        let totalAmount = 0;

        // Begin transaction
        session.startTransaction();

        for (const item of items) {
            const product = products.find(p => p._id.toString() === item.productId);
            if (!product) throw new Error(`Product ${item.productId} not found`);
            if (product.stock < item.quantity) throw new Error(`Insufficient stock for ${product.name}`);

            // Deduct stock
            product.stock -= item.quantity;
            await product.save({ session });

            const subtotal = product.price * item.quantity;
            totalAmount += subtotal;

            // Group by vendor
            const vendorId = product.vendorId.toString();
            if (!vendorMap.has(vendorId)) {
                vendorMap.set(vendorId, []);
            }
            vendorMap.get(vendorId).push({
                productId: product._id,
                quantity: item.quantity,
                price: product.price,
            });
        }

        // creating master order
        const masterOrder = new masterOrderModel({ customerId, totalAmount });
        await masterOrder.save({ session });

        const subOrderIds = [];

        // Creating all the sub-orders
        for (const [vendorId, orderItems] of vendorMap.entries()) {
            const vendorTotal = orderItems.reduce((sum, i) => sum + i.quantity * i.price, 0);
            const subOrder = new subOrderModel({
                masterOrderId: masterOrder._id,
                vendorId,
                items: orderItems,
                total: vendorTotal,
            });
            await subOrder.save({ session });
            subOrderIds.push(subOrder._id);
        }

        masterOrder.subOrders = subOrderIds;
        await masterOrder.save({ session });

        await session.commitTransaction();
        session.endSession();
        return res.status(201).send({ message: 'Order placed successfully', masterOrderId: masterOrder._id })
    }
    catch (err) {
        await session.abortTansaction()
        session.endSession()
        return res.status(500).send("Something broke, try again")
    }
}

module.exports = {
    placeOrder
}