import { PROFILE_VENUES } from "./constants";
import { API_KEY } from "./constants";

export async function getProfileVenues(name, accessToken) {
  const response = await fetch(`${PROFILE_VENUES}/${name}/venues`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "X-Noroff-API-KEY": API_KEY,
    },
  });
  if (!response.ok) {
    throw new Error("Failed to fetch user´venues");
  }
  return await response.json();
}
