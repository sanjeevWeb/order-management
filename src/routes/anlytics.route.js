const { revenuePerVendor, topFiveProductBySales, averageOrderValue, dailySalesLast7Days, lowStockItemsForVendor } = require('../controllers/analytics.controller')
const { authorization } = require('../middlewares/auth.middleware')
const { authorizeRoles } = require('../middlewares/role.middleware')

const router = require('express').Router()

router.get('/analytics/revenue/admin', authorization, authorizeRoles('admin'), revenuePerVendor)

router.get('/analytics/product/admin', authorization, authorizeRoles('admin'), topFiveProductBySales)

router.get('/analytics/avg-order/admin', authorization, authorizeRoles('admin'), averageOrderValue)

router.get('/analytics/daily-sales/vendor', authorization, authorizeRoles('vendor'), dailySalesLast7Days)

router.get('/analytics/low-stock/vendor', authorization, authorizeRoles('vendor'), lowStockItemsForVendor)

module.exports = router