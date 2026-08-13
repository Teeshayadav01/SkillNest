// Catches routes that don't match anything
const notFound = (req, res, next) => {
  res.status(404).json({ message: `Route not found: ${req.originalUrl}` });
};

// Catches any error passed via next(error) or thrown in an async handler
// (kept simple/global on top of the try/catch already in each controller)
const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  const statusCode = res.statusCode && res.statusCode !== 200 ? res.statusCode : 500;
  res.status(statusCode).json({
    message: err.message || "Internal server error",
  });
};

module.exports = { notFound, errorHandler };
