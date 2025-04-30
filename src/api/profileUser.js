import { PROFILE } from "./constants";

export const getProfile = async (name, token, apiKey) => {
  const response = await fetch(`${PROFILE}/${name}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "X-Noroff-API-KEY": apiKey,
    },
  });
  return await response.json();
};

export const updateProfile = async (name, token, apiKey, data) => {
  const response = await fetch(`${PROFILE}/${name}`, {
    method: "PUT",
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
      "X-Noroff-API-KEY": apiKey,
    },
    body: JSON.stringify(data),
  });
  return await response.json();
};
