exports.sendResponse = (res, statusCode, message, data) => {
  let success = false;
  if (statusCode >= 200 && statusCode < 230) {
    success = true;
  }
  return res.status(statusCode).json({
    success,
    message: message,
    data: data,
  });
};
