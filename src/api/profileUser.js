import { PROFILE } from "./constants";
import { API_KEY } from "./constants";
import { UPDATE_PROFILE } from "./constants";
export const getProfile = async (name, accessToken) => {
  const response = await fetch(`${PROFILE}/${name}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "X-Noroff-API-KEY": API_KEY,
    },
  });
  const result = await response.json();

  return result;
};

export const updateProfile = async (name, accessToken, data) => {
  const response = await fetch(`${UPDATE_PROFILE}/${name}`, {
    method: "PUT",
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${accessToken}`,
      "X-Noroff-API-KEY": API_KEY,
    },
    body: JSON.stringify(data),
  });
  return await response.json();
};
