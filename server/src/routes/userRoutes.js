const express = require('express');
const router = express.Router();
const {
  signup,
  login,
  logout,
  getUserDetails,
} = require('../controllers/userController');
const { checkSignUp, checkLogin } = require('../validations/userValidation');
const { isAuthenticated } = require('../middlewares/auth');

router.route('/signup').post(checkSignUp, signup);
router.route('/login').post(checkLogin, login);
router.route('/logout').get(logout);
router.route('/getuser').get(isAuthenticated, getUserDetails);
module.exports = router;
