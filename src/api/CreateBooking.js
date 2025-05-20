import { loadToken } from "../storage/load";
import { API_KEY, MAKE_BOOKING } from "./constants/";

export async function createBooking({ dateFrom, dateTo, guests, venueId }) {
  const accessToken = loadToken();
  const apiKey = API_KEY;

  const payload = { dateFrom, dateTo, guests, venueId };

  console.log("Sending booking payload:", payload);

  const response = await fetch(`${MAKE_BOOKING}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
      "X-Noroff-API-Key": apiKey,
    },
    body: JSON.stringify(payload),
  });

  const responseText = await response.text();

  if (!response.ok) {
    try {
      const errorData = JSON.parse(responseText);
      throw new Error(JSON.stringify(errorData));
    } catch {
      throw new Error(responseText);
    }
  }

  return JSON.parse(responseText);
}
