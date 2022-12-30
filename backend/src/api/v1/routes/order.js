const router = require('express').Router();
const {
  newOrder
} = require('../order/controller');
router.post('/', newOrder);
module.exports = router;