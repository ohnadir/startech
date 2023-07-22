const router = require('express').Router();
const {
  register,
  login,
  updateUser,
  deleteUser,
  logout,
  getUserProfile,
  getUsers

} = require('../controller/user');

const {
  addUserValidator,
  updateUserValidator,
  idValidator,
} = require('../validation/user');

const validationResult = require('../validators');
const { isAuthenticatedUser, authorizeRoles } = require('../middleware/auth')


// authorizeRoles('user');
// authorizeRoles('admin');

router.post('/signup',  register);
router.get('/',  getUsers);
router.post('/login', login);
router.patch( '/:id', idValidator, updateUserValidator, validationResult, updateUser);
router.delete('/:id', idValidator, validationResult, deleteUser);
router.get('/logout', logout);
router.get('/me', getUserProfile);

module.exports = router;