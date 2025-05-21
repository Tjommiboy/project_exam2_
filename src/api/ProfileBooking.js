import { loadToken } from "../storage/load";
import { loadProfile } from "../storage/loadProfile";
import { API_KEY, PROFILE } from "./constants";

export async function profileBookings() {
  const accessToken = loadToken();
  const apiKey = API_KEY;
  const profileName = loadProfile().name; // assuming loadProfile() returns an object with `.name`

  try {
    const response = await fetch(`${PROFILE}/${profileName}/bookings`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "X-Noroff-API-Key": apiKey,
      },
    });
    if (!response.ok) {
      console.error(
        "Failed to fetch profile bookings. Status:",
        response.status
      );
      return [];
    }

    const result = await response.json();
    console.log("Profile bookings result:", result);
    return result.data;
  } catch (error) {
    console.error("Error fetching profile bookings:", error);
    return [];
  }
}
