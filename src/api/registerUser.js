import { REGISTER } from "./constants";
export async function registerUser(payload) {
  const response = await fetch(`${REGISTER}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Registration failed.");
  }

  return data;
}
