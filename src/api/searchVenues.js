export const searchVenues = async (query) => {
  try {
    const response = await fetch(
      `https://v2.api.noroff.dev/holidaze/venues/search?q=${encodeURIComponent(
        query
      )}`
    );
    console.log(response);

    if (!response.ok) {
      throw new Error("Failed to fetch venues");
    }

    const data = await response.json();
    console.log(data); // Check if data is empty

    if (data.data.length === 0) {
      console.log("No venues found for your search.");
    }

    return data.data; // Return the venue data, or empty array if none
  } catch (error) {
    console.error("Error fetching venues:", error);
    return []; // Return an empty array if there's an error
  }
};
