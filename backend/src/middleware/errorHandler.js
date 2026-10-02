function notFound(req, res) {
  res.status(404).json({ message: `Route not found: ${req.method} ${req.originalUrl}` });
}

function errorHandler(err, req, res, next) {
  console.error(err);

  if (err.code === 11000) {
    return res.status(400).json({ message: 'A record with this unique value already exists' });
  }

  res.status(err.status || 500).json({
    message: err.message || 'Internal server error'
  });
}

module.exports = { notFound, errorHandler };
