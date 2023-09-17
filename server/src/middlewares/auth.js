const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { statusCodes } = require('../../constants');

exports.isAuthenticated = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      return res
        .status(statusCodes.UN_AUTHORIZED)
        .json({ message: 'Please login to access this resource' });
    }
    const data = jwt.verify(token, process.env.SECRET_KEY);
    req.user = await User.findById(data.id);
    next();
  } catch (err) {
    return res
      .status(statusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: 'Internal server error!' });
  }
};
