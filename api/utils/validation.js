const isValidDate = (dateString) => {
  const date = new Date(dateString);
  return date instanceof Date && !Number.isNaN(date);
};

const validateLine = (line) => {
  const {
    depatureDate,
    returnDate,
    depatureStationId,
    returnStationId,
    distance,
    duration,
  } = line;

  if (!isValidDate(depatureDate) || !isValidDate(returnDate)) {
    return false;
  }

  if (depatureStationId <= 0 || returnStationId <= 0) {
    return false;
  }

  if (distance <= 10 || duration <= 10) {
    return false;
  }

  return true;
};

module.exports = {
  validateLine,
};
