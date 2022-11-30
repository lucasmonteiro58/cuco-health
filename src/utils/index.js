export function verifyContainsNumbers(text) {
  const regex = /\d/;
  return regex.test(text);
}

export function verifyIsCpf(text) {
  // eslint-disable-next-line no-useless-escape
  const regex = /^\d{3}\.\d{3}\.\d{3}\-\d{2}$/;
  return regex.test(text);
}
