export const metersToKilometer = (meters, fixed = 0) =>
  (meters / 1000).toFixed(fixed);

export const secondsToMinutes = (seconds) => {
  const minutes = seconds / 60; // will return minutes.seconds. seconds will be fraction of 60
  const minutesString = minutes.toString();

  if (minutesString.indexOf('.') === -1) {
    return `${minutes}:00`;
  } else {
    const splitMinutesString = minutesString.split('.');
    const secondsDecimal = `0.${splitMinutesString[1]}`;
    const seconds = (secondsDecimal * 60).toFixed();
    return `${splitMinutesString[0]}:${seconds}`;
  }
};

export const calculateSpeed = (distance, time) => {
  // https://www.quora.com/How-do-I-convert-m-s-to-km-h#:~:text=OK%2C%20let%E2%80%99s%20break%20it%20down%20into%20some%20simple%20stages.
  const metersPerSecond = distance / time; // distance will be in meters and time in seconds.
  const kilometersPerSecond = metersPerSecond / 1000; // converts to kilometers per second
  const kilometersPerMinute = kilometersPerSecond * 60; // converts to kilometers per minute
  const kilometersPerHour = kilometersPerMinute * 60; // converts to kilomters per hour
  return kilometersPerHour.toFixed(1);
};
