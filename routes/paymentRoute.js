const router = require('express').Router();
const {
    processPayment,
    sendStripApi
} = require('../controller/payment')

router.post('/process',  processPayment);
router.get('/stripeapi', sendStripApi);


module.exports = router;