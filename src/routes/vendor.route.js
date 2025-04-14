const { addProduct, updateProduct, deleteProduct } = require('../controllers/vendor.controller')
const { authorization } = require('../middlewares/auth.middleware')
const { authorizeRoles } = require('../middlewares/role.middleware')
const { createProductSchema } = require('../validations/vendor.validation')

const router = require('express').Router()

router.post('/product', authorization, authorizeRoles('vendor'), addProduct)

router.put('/product/:id', authorization, authorizeRoles('vendor'), updateProduct)

router.delete('/product/:id', authorization, authorizeRoles('vendor'), deleteProduct)

module.exports = router