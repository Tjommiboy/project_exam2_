import { EDIT_VENUE, API_KEY } from "./constants";
import { loadToken } from "../storage/load";

export const UpdateVenue = async (e) => {
  const accessToken = loadToken();

  const apiKey = API_KEY;
  e.preventDefault();
  try {
    const response = await fetch(`${EDIT_VENUE}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
        "X-Noroff-API-Key": apiKey,
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error("Failed to update venue");
    }

    const updatedData = await response.json();
    console.log("Venue updated successfully:", updatedData);
    // optionally navigate or give feedback
  } catch (error) {
    console.error("Error updating venue:", error);
  }
};
