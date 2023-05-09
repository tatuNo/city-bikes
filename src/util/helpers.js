export const metersToKilometers = (meters) => {
  const kilometers = meters / 1000;
  return parseFloat(kilometers.toFixed(2));
};

export const secondsToMinutes = (seconds) => {
  const minutes = seconds / 60;
  return parseFloat(minutes.toFixed(1));
};

export const minutesToSeconds = (minutes) => {
  const seconds = minutes * 60;
  return seconds;
};

export const kilometersToMeters = (kilometers) => {
  const meters = kilometers * 1000;
  return meters;
};
