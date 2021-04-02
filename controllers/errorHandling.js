// return response in case of error
module.exports = (err, req, res, next) => {
  res.status(err.statis || 500).json(err.message || 'Server error');
}