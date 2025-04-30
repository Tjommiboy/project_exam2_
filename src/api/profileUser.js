import { PROFILE } from "./constants";
import { API_KEY } from "./constants";

export const getProfile = async (name, token) => {
  const response = await fetch(`${PROFILE}/${name}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "X-Noroff-API-KEY": API_KEY,
    },
  });
  const result = await response.json();
  console.log(result); // ✅ Now logs the actual JSON data

  return result;
};

export const updateProfile = async (name, token, data) => {
  const response = await fetch(`${PROFILE}/${name}`, {
    method: "PUT",
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
      "X-Noroff-API-KEY": API_KEY,
    },
    body: JSON.stringify(data),
  });
  return await response.json();
};
