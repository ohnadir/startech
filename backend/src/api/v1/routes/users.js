const router = require('express').Router();
const {
  register,
  login,
  updateUser,
  deleteUser,
  getUsers,
  getUser,
  logout,
  searchUser,
  forgotPassword,
  resetPassword,
  updatePassword

} = require('../user/controller');

const {
  addUserValidator,
  updateUserValidator,
  idValidator,
} = require('../user/validator');

const validationResult = require('../validators');
const { isAuthenticatedUser, authorizeRoles } = require('../middleware/auth')


// authorizeRoles('user');
// authorizeRoles('admin');

router.post('/signup', addUserValidator, validationResult, register);
router.post('/login', login);

router.patch(
  '/:id',
  idValidator,
  updateUserValidator,
  validationResult,
  updateUser
);

router.delete('/:id', idValidator, validationResult, deleteUser);

router.get('/', getUsers);

router.get('/search', searchUser);
router.get('/logout', logout);
router.post('/password/forgot', forgotPassword);
router.put('/password/reset/:token', resetPassword);

router.get('/:id', isAuthenticatedUser, authorizeRoles('admin'), idValidator, validationResult, getUser);

module.exports = router;