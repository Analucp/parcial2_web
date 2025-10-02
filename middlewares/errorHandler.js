const errorHandler = (err, req, res, next) => {
  console.error("Error capturado por middleware:", err.stack);

  const status = err.status || 500;

  res.status(status).json({
    error: status === 500 ? "Error interno del servidor" : err.message,
  });
};

module.exports = errorHandler;

