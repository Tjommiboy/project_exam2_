import { LOGIN } from "./constants";

export async function loginUser(email, password) {
  const response = await fetch(`${LOGIN}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(email, password),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Login failed.");
  }
  return data;
}
