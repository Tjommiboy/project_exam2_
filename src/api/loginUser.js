import { LOGIN } from "./constants";

export async function loginUser(payload) {
  const response = await fetch(`${LOGIN}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const data = await response.json();
  console.log("Login data:", data);
  console.log(localStorage.getItem("accessToken"));
  if (!response.ok) {
    throw new Error(
      data.message || "Login failed. (email must contain @stud.noroff.no)"
    );
  }

  return data;
}
