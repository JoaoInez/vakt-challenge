module.exports = (err, req, res, next) => {
  const error = err ? err : 500;
  res.sendStatus(error);
};
