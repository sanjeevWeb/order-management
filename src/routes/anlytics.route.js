const { revenuePerVendor, topFiveProductBySales, averageOrderValue, dailySalesLast7Days, lowStockItemsForVendor } = require('../controllers/analytics.controller')
const { authorization } = require('../middlewares/auth.middleware')
const { authorizeRoles } = require('../middlewares/role.middleware')

const router = require('express').Router()

router.get('/analytics/admin', authorization, authorizeRoles('vendor'), revenuePerVendor)

router.get('/analytics/admin', authorization, authorizeRoles('admin'), topFiveProductBySales)

router.get('/analytics/admin', authorization, authorizeRoles('admin'), averageOrderValue)

router.get('/analytics/vendor', authorization, authorizeRoles('admin'), dailySalesLast7Days)

router.get('/analytics/vendor', authorization, authorizeRoles('admin'), lowStockItemsForVendor)

module.exports = router