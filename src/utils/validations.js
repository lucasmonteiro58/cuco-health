import { verifyCpfValid, verifyDataValid } from "@/utils";

export const schema = {
  name(value) {
    if (!value) {
      return "O nome é obrigatório";
    } else return true;
  },
  cpf(value) {
    if (!value) {
      return "O CPF é obrigatório";
    } else if (value.length < 14) {
      return "O CPF deve ter 11 dígitos";
    } else if (!verifyCpfValid(value)) {
      return "O CPF é inválido";
    } else return true;
  },
  birthdate(value) {
    if (!value) {
      return "A data de nascimento é obrigatória";
    } else if (!verifyDataValid(value)) {
      return "A data de nascimento é inválida";
    } else return true;
  },
  phone(value) {
    if (!value) {
      return "O telefone é obrigatório";
    } else if (value.length < 14) {
      return "Telefone inválido";
    } else return true;
  },
};
