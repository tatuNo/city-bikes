const unknownEndpoint = (_request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

const errorHandler = (error, _request, response, next) => {
  if (error.name === "SequelizeDatabaseError") {
    return response.status(400).json({ error: error.message });
  }
  next(error);
};

module.exports = {
  unknownEndpoint,
  errorHandler,
};
