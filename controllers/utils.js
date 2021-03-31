// wraps around endpoint function, forwards error with next to errorHandler
exports.asyncHandler = fn => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);