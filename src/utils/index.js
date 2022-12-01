import moment from "moment/min/moment-with-locales";

export function verifyContainsNumbers(text) {
  const regex = /\d/;
  return regex.test(text);
}

export function verifyIsCpf(text) {
  // eslint-disable-next-line no-useless-escape
  const regex = /^\d{3}\.\d{3}\.\d{3}\-\d{2}$/;
  return regex.test(text);
}

export function verifyCpfValid(text) {
  const cpf = text.replace(/\D/g, "");
  if (cpf.length !== 11) return false;
  if (cpf === "00000000000") return false;
  let sum = 0;
  let rest;
  for (let i = 1; i <= 9; i++) {
    sum = sum + parseInt(cpf.substring(i - 1, i)) * (11 - i);
  }
  rest = (sum * 10) % 11;
  if (rest === 10 || rest === 11) rest = 0;
  if (rest !== parseInt(cpf.substring(9, 10))) return false;
  sum = 0;
  for (let i = 1; i <= 10; i++) {
    sum = sum + parseInt(cpf.substring(i - 1, i)) * (12 - i);
  }
  rest = (sum * 10) % 11;
  if (rest === 10 || rest === 11) rest = 0;
  if (rest !== parseInt(cpf.substring(10, 11))) return false;
  return true;
}

export function verifyDataValid(text) {
  const regex = /^\d{2}\/\d{2}\/\d{4}$/;
  return regex.test(text);
}

export function convertDateToIso(text) {
  const date = moment(text, "DD/MM/YYYY");
  return date.format("YYYY-MM-DD");
}

export function convertDateToBR(text) {
  const date = moment(text);
  return date.format("DD/MM/YYYY");
}
