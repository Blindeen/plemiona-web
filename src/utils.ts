export const camelToSnakeCase = (str: string) => str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);

export const stringToTitle = (str: string) =>
  (str.charAt(0).toUpperCase() + str.slice(1)).replace(/([a-z])([A-Z])/g, '$1 $2');

export const padTo2Digits = (num: number) => num.toString().padStart(2, '0');

export const msToUpgradeLabel = (milliseconds: number) => {
  if (milliseconds <= 0) return 'Upgrade';

  let seconds = Math.floor(milliseconds / 1000);
  let minutes = Math.floor(seconds / 60);

  seconds = seconds % 60;

  return `${padTo2Digits(minutes)}:${padTo2Digits(seconds)}`;
};

export const upgradeDurationSecondsLabel = (seconds: number) => {
  let minutes = Math.floor(seconds / 60);

  seconds = seconds % 60;

  return `${padTo2Digits(minutes)}:${padTo2Digits(seconds)}`;
};
