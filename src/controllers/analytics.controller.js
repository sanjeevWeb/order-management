const masterOrderModel = require("../models/master-order.model");
const subOrderModel = require("../models/sub-order.model");

const revenuePerVendor = async (req, res, next) => {
    try {
        const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);

        const revenue = await subOrderModel.aggregate([
            { $match: { createdAt: { $gte: thirtyDaysAgo } } },
            {
                $group: {
                    _id: "$vendorId",
                    totalRevenue: { $sum: "$total" }
                }
            },
            {
                $lookup: {
                    from: "users",
                    localField: "_id",
                    foreignField: "_id",
                    as: "vendor"
                }
            },
            { $unwind: "$vendor" },
            {
                $project: {
                    vendorName: "$vendor.name",
                    totalRevenue: 1
                }
            }
        ]);

        return res.status(200).send({ message: "revenue per vendor (last 30 days)", revenue })

    } catch (error) {
        return res.status(500).send("Something broke, try again")
    }
}

const topFiveProductBySales = async (req, res, next) => {
    try {
        const topProducts = await subOrderModel.aggregate([
            { $unwind: "$items" },
            {
                $group: {
                    _id: "$items.productId",
                    totalSold: { $sum: "$items.quantity" }
                }
            },
            {
                $lookup: {
                    from: "products",
                    localField: "_id",
                    foreignField: "_id",
                    as: "product"
                }
            },
            { $unwind: "$product" },
            {
                $project: {
                    name: "$product.name",
                    totalSold: 1
                }
            },
            { $sort: { totalSold: -1 } },
            { $limit: 5 }
        ]);


        return res.status(200).send({ message: "revenue per vendor (last 30 days)", revenue })

    } catch (error) {
        return res.status(500).send("Something broke, try again")
    }
}

const averageOrderValue = async (req, res, next) => {
    try {
        const avgOrderValue = await masterOrderModel.aggregate([
            {
                $group: {
                    _id: null,
                    avgValue: { $avg: "$totalAmount" }
                }
            }
        ]);

        return res.status(200).send({ message: "average order value", avgOrderValue })
    } catch (error) {
        return res.status(500).send("Something broke, try again")
    }
}

const dailySalesLast7Days = async (req, res, next) => {
    try {
        const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

        const dailySales = await subOrderModel.aggregate([
            {
                $match: {
                    vendorId: mongoose.Types.ObjectId(req.user._id),
                    createdAt: { $gte: sevenDaysAgo }
                }
            },
            {
                $group: {
                    _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
                    totalSales: { $sum: "$total" }
                }
            },
            { $sort: { "_id": 1 } }
        ]);


        return res.status(200).send({ message: "daily sales for vendor(last 7 days)", dailySales })
    } catch (error) {
        return res.status(500).send("Something broke, try again")
    }
}

const lowStockItemsForVendor = async (req, res, next) => {
    try {
        const lowStockItems = await Product.find({
            vendorId: req.user._id,
            stock: { $lte: 5 }  
          }).select("name stock");
          

        return res.status(200).send({ message: "low stock items", lowStockItems })
    } catch (error) {
        return res.status(500).send("Something broke, try again")
    }
}

module.exports = {
    revenuePerVendor,
    topFiveProductBySales,
    averageOrderValue,
    dailySalesLast7Days,
    lowStockItemsForVendor
}