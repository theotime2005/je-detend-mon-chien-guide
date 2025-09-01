import { getLogin } from "@/utils/token-manager.js";

const CHECK_PATH = "/api/authenticated";

async function checkUser() {
  const token = getLogin();
  if (!token) return false;
  try {
    const request = await fetch(CHECK_PATH, {
      headers: {
        "authorization": `Bearer ${token}`,
      },
    });
    if (request.status === 200) {
      const { data } = await request.json();
      return data;
    } else {
      return false;
    }
  } catch {
    return false;
  }
}

export default checkUser;
