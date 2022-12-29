const router = require('express').Router();
const {
    processPayment,
    sendStripApi
} = require('../payment/controller')

router.post('/process',  processPayment);
router.get('/stripeapi', sendStripApi);


module.exports = router;