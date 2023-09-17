const User = require('../models/User');
const { saveToCookie } = require('../utils/saveToCookie');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const { statusCodes } = require('../../constants');

exports.signup = catchAsyncErrors(async (req, res) => {
  const { name, email, password } = req.body;
  if (await User.findOne({ email })) {
    return res
      .status(statusCodes.BAD_REQUEST)
      .json({ error: 'User with this email already exists.' });
  }
  console.log(name, email, password);
  const newUser = await User.create({
    name,
    email,
    password,
  });
  if (!newUser) {
    return res
      .status(statusCodes.BAD_REQUEST)
      .json({ error: 'Error in creating new user' });
  }
  saveToCookie(newUser, 201, res);
});

exports.login = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;
  const UserFound = await User.findOne({ email });
  if (!UserFound) {
    return res
      .status(statusCodes.BAD_REQUEST)
      .json({ error: 'Invalid email or password.' });
  }
  const matchPassword = await UserFound.matchPassword(password);
  if (!matchPassword) {
    return res
      .status(statusCodes.BAD_REQUEST)
      .json({ error: 'Invalid email or password.' });
  }

  saveToCookie(UserFound, 200, res);
});

exports.logout = catchAsyncErrors(async (req, res) => {
  res.cookie('token', null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });
  return res
    .status(statusCodes.OK)
    .json({ message: 'Successfully logged out!' });
});

exports.getUserDetails = catchAsyncErrors(async (req, res) => {
  if (req.user) {
    const user = await User.findById(req.user?.id);
    res.status(200).json({ success: true, user });
  }
});
