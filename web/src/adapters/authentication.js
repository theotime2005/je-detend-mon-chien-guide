import { setLogin } from "@/utils/token-manager.js";

const BASE_URL = "/api/authentication/";

async function registerUser({ firstname, lastname, email, password, userType }) {
  const requestBody = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      firstname,
      lastname,
      email,
      password,
      userType,
    }),
  };
  try {
    const request = await fetch(`${BASE_URL}register`, requestBody);
    return request.status === 200 ? true : false;
  } catch {
    return false;
  }
}

async function activateUser(token) {
  const requestBody = {
    method: "PATCH",
    headers: {
      authorization: `Bearer ${token}`,
    },
  };

  try {
    const request = await fetch(`${BASE_URL}register`, requestBody);
    return request.status === 204;
  } catch {
    return false;
  }
}

async function loginUser({ email, password }) {
  const requestBody = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  };
  try {
    const request = await fetch(`${BASE_URL}login`, requestBody);
    if (request.status === 200) {
      const { data } = await request.json();
      setLogin(data.token);
      return true;
    } else {
      let message;
      switch (request.status) {
      case 401:
        message = "Email ou mot de passe incorrect.";
        break;
      default:
        message = "Une erreur est survenue.";
      }
      return message;
    }
  } catch {
    return "Une erreur est survenue";
  }
}

export { activateUser, loginUser, registerUser };
