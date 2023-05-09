export const metersToKilometers = (meters) => {
  const kilometers = meters / 1000;
  return parseFloat(kilometers.toFixed(2));
};

export const secondsToMinutes = (seconds) => {
  const minutes = seconds / 60;
  return parseFloat(minutes.toFixed(1));
};
