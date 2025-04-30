import { PROFILE } from "./constants";

export const getProfile = async (name, token, API_KEY) => {
  const response = await fetch(`${PROFILE}/${name}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "X-Noroff-API-KEY": API_KEY,
    },
  });
  return await response.json();
};
