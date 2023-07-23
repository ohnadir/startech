const router = require('express').Router();
const { order, emailOrder, orderDetails, orders } = require('../controller/orders');
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth")

router.post('/', isAuthenticatedUser, order);
router.get('/:email', isAuthenticatedUser, emailOrder);
router.get('/details/:id', isAuthenticatedUser, orderDetails);
router.get('/', authorizeRoles, orders);
module.exports = router;