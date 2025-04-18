const API_BASE = "https://v2.api.noroff.dev/holidaze";

export async function getAllVenues() {
  const response = await fetch(`${API_BASE}/venues`);
  if (!response.ok) {
    throw new Error("failed to fetch venues");
  }
  const data = await response.json();

  return data;
}
