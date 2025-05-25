import { ALLVENUES } from "./constants";

export async function getAllVenues(page = 1, limit = 20) {
  const response = await fetch(
    `${ALLVENUES}?page=${page}&limit=${limit}&sort=created&order=desc`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch venues");
  }

  const data = await response.json();

  return data; // Make sure this includes a .meta.total
}
