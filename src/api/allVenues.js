import { ALLVENUES } from "./constants";

export async function getAllVenues() {
  const response = await fetch(`${ALLVENUES}`);
  if (!response.ok) {
    throw new Error("failed to fetch venues");
  }
  const data = await response.json();

  return data;
}
