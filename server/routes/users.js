const router = require('express').Router();
const { register, login, logout, update, loadUser, users, user, changePassword, putUserInfo } = require("../controller/users")
const { isAuthenticatedUser, authorizeRoles } = require('../middleware/auth')

router.post('/signup', register);
router.patch('/update/:id', isAuthenticatedUser, update );
router.post('/login', login);
router.post('/logout', logout);
router.get('/me', isAuthenticatedUser, loadUser);
router.get('/', authorizeRoles, users);
router.get('/:id', authorizeRoles, user);
router.patch('/change/:id', isAuthenticatedUser,  changePassword);
router.put('/info/:id', isAuthenticatedUser, putUserInfo);

module.exports = router