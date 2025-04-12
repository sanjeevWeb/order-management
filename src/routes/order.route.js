const { authorization } = require('../middlewares/auth.middleware')
const { authorizeRoles } = require('../middlewares/role.middleware')

const router = require('express').Router()

router.post('/order',authorization ,authorizeRoles('customer'))

module.exports = router