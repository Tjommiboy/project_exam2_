import { loadToken } from "../storage/load";
import { DELETE_VENUE, API_KEY } from "./constants";

export async function VenueDelete(venueId) {
  const accessToken = loadToken();

  const response = await fetch(`${DELETE_VENUE}/${venueId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "X-Noroff-API-Key": API_KEY,
    },
  });

  if (response.status === 204) {
    console.log("Venue deleted successfully");
  } else {
    const errorData = await response.json();
    console.error("Failed to delete venue", errorData);
  }
}
