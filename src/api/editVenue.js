import { EDIT_VENUE, API_KEY } from "./constants";
import { loadToken } from "../storage/load";

export const editVenue = async (id, formData) => {
  const accessToken = loadToken();
  const apiKey = API_KEY;

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

    // ✅ return the response data
    return updatedData;
  } catch (error) {
    console.error("Error updating venue:", error);
    throw error; // rethrow so it can be handled in the caller
  }
};
