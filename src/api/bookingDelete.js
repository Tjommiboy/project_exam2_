import { BOOKING_DELETE } from "./constants";
import { loadToken } from "../storage/load";
import { API_KEY } from "./constants";

export async function bookingDelete(bookingId) {
  const accessToken = loadToken();
  const api_key = API_KEY;
  const response = await fetch(`${BOOKING_DELETE}/${bookingId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "X-Noroff-API-Key": api_key,
    },
  });
  if (!response.ok) {
    throw new Error("Failed to delete booking");
  }
}
