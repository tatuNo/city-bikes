// eslint-disable-next-line consistent-return
const errorHandler = (error, _request, response, next) => {
  if (error.name === "SequelizeDatabaseError") {
    return response.status(400).json({ error: error.message });
  }
  next(error);
};

module.exports = {
  errorHandler,
};
