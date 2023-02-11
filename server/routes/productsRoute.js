const router = require('express').Router();
const {
  addProduct,
  updateProduct,
  deleteProduct,
  getProducts,
  getProduct,
  searchProduct,
  filterProduct,
  createProductReview
} = require('../controller/product');


const {
  addProductValidator,
  updateProductValidator,
  idValidator,
} = require('../validation/product');

const { isAuthenticatedUser, authorizeRoles } = require('../middleware/auth')
const validationResult = require('../validators');

router.post('/', addProductValidator, validationResult,  addProduct);

router.patch(
  '/:id',
  idValidator,
  updateProductValidator,
  validationResult,
  updateProduct
);

router.delete('/:id', idValidator, validationResult, deleteProduct);

router.get('/', getProducts);
router.get('/search', searchProduct);
router.put('/review/:id', createProductReview);

router.get('/:id', idValidator, validationResult, getProduct);

module.exports = router;
