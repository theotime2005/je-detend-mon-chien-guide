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

export { registerUser };
