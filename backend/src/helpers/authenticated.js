module.exports = (fn) => (req, res, next) => {
  if (req.user) {
    fn(req, res, next);
  } else {
    next(401);
  }
};
