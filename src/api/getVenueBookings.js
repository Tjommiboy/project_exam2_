import { loadToken } from "../storage/load";
import { loadProfile } from "../storage/loadProfile";
import { ALLBOOKINGS, ALLVENUES, API_KEY } from "./constants";

export async function getVenueBookings(venueId) {
  const accessToken = loadToken();
  const apiKey = API_KEY;

  try {
    const response = await fetch(`${ALLVENUES}/${venueId}?_bookings=true`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "X-Noroff-API-Key": apiKey,
      },
    });

    const result = await response.json();

    if (!response.ok) {
      console.error("Failed to fetch venue. Status:", result.status);
      return [];
    }

    const venue = result.data;

    const venueBookings = venue.bookings || [];
    console.log("Bookings for venue:", venueBookings);

    return venueBookings;
  } catch (error) {
    console.error("Error fetching bookings:", error);
    return [];
  }
}
