import { loadToken } from "../storage/load";
import { DELETE_VENUE } from "./constants";

export async function deleteVenue(VenueId) {
  const accessToken = loadToken();
  const response = await fetch(`${DELETE_VENUE}/${VenueId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  if (response.status === 204) {
    console.log("Venue deleted successfully");
  } else {
    const errorData = await response.json();
    console.error("failed to delete venue", errorData);
  }
}
