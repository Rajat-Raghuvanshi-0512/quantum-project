exports.saveToCookie = (user, statusCode, res) => {
  const token = user.getJwtToken();
  const options = {
    httpOnly: true,
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
  };
  delete user._doc.password;
  res.status(statusCode).cookie('token', token, options).json({ user });
};
