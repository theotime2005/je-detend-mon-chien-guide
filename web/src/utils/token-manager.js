import { STORAGE_VARIABLES } from "@/constants.js";

function setLogin(loginToken) {
  localStorage.setItem(STORAGE_VARIABLES.token, loginToken);
}

function getLogin() {
  return localStorage.getItem(STORAGE_VARIABLES.token);
}

function clearLogin() {
  localStorage.removeItem(STORAGE_VARIABLES.token);
}

export { clearLogin, getLogin, setLogin };
