const { addProduct, updateProduct, deleteProduct, getAllProductsByVendor } = require('../controllers/vendor.controller')
const { authorization } = require('../middlewares/auth.middleware')
const { authorizeRoles } = require('../middlewares/role.middleware')
const validateRequest = require('../middlewares/validate-request.middleware')
const { createProductSchema, updateProductSchema } = require('../validations/vendor.validation')

const router = require('express').Router()

router.post('/product', validateRequest(createProductSchema), authorization, authorizeRoles('vendor'), addProduct)

router.put('/product/:id', validateRequest(updateProductSchema), authorization, authorizeRoles('vendor'), updateProduct)

router.delete('/product/:id', authorization, authorizeRoles('vendor'), deleteProduct)

router.get('/product', authorization, authorizeRoles('vendor'), getAllProductsByVendor)

module.exports = router