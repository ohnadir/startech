const router = require('express').Router();
const { products, product, searchProduct } = require("../controller/products")

router.get('/', products);
router.get('/search', searchProduct);
router.get('/details/:id', product);
module.exports = router;