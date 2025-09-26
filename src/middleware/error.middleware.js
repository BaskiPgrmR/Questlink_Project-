const errorMiddleware = (err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({
    error: {
      message: err.message || 'An unknown server error occurred.',
      status: err.status || 500
    }
  });
};

module.exports = { errorMiddleware };
