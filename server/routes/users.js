const router = require('express').Router();
const { register, login, logout, update, loadUser, users, user, changePassword } = require("../controller/users")
const { isAuthenticatedUser, authorizeRoles } = require('../middleware/auth')

router.post('/signup', register);
router.patch('/update', isAuthenticatedUser, update );
router.post('/login',  login);
router.get('/logout', isAuthenticatedUser, logout);
router.get('/me', isAuthenticatedUser, loadUser);
router.get('/', authorizeRoles, users);
router.get('/:id', authorizeRoles, user);
router.patch('/change', isAuthenticatedUser,  changePassword);

module.exports = router