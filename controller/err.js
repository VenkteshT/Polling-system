const errorController = (err, req, res, next) => {
  res.status(400).json({
    status: "failed",
    message: err.message,
  });
  next();
};

module.exports = errorController;
