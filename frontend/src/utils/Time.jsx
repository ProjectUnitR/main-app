export const getTime = (time) => {
  if (time.getHours() < 10 || time.getHours() > 12) {
    return `${time.toLocaleTimeString().slice(0, 4)} ${time.toLocaleTimeString().slice(8)}`;
  } else {
    return `${time.toLocaleTimeString().slice(0, 5)} ${time.toLocaleTimeString().slice(8)}`;
  }
};
