const router = require('express').Router();
const { processPayment } = require('../service/payments')

router.post('/process',  processPayment);
module.exports = router;