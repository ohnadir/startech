const router = require('express').Router();
const {
  newOrder, getOrderList
} = require('../controller/order');
router.post('/', newOrder);
router.get('/', getOrderList);
module.exports = router;