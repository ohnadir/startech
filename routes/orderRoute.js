const router = require('express').Router();
const {
  newOrder
} = require('../controller/order');
router.post('/', newOrder);
module.exports = router;