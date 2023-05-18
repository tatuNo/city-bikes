const stationBlackList = [997, 754, 999];

/* eslint-disable no-restricted-globals */
const isValidDate = (date) => date instanceof Date && !isNaN(date);

const validateLine = (line) => {
  const {
    departureDate,
    returnDate,
    departureStationId,
    returnStationId,
    distance,
    duration,
  } = line;

  if (!isValidDate(departureDate) || !isValidDate(returnDate)) {
    return false;
  }

  if (departureStationId < 0 || returnStationId < 0) {
    return false;
  }

  if (
    stationBlackList.includes(departureStationId) ||
    stationBlackList.includes(returnStationId)
  ) {
    return false;
  }

  if (distance < 10 || duration < 10) {
    return false;
  }

  if (!Number.isInteger(distance) || !Number.isInteger(duration)) {
    return false;
  }

  return true;
};

module.exports = {
  validateLine,
};
