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
    console.log(minutes);
    console.log(splitMinutesString[1]);
    console.log(seconds);
    return `${splitMinutesString[0]}:${seconds}`;
  }
};
