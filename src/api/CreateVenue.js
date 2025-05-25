import { loadToken } from "../storage/load";
import { API_KEY, CREATE_VENUE } from "./constants";

export async function createVenue(data) {
  const accessToken = loadToken();
  const apiKey = API_KEY;

  const response = await fetch(CREATE_VENUE, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
      "X-Noroff-API-Key": apiKey,
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.errors?.[0]?.message || "Venue creation failed");
  }

  return response.json();
}
