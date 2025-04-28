const API_BASE = "https://v2.api.noroff.dev";
export const REGISTER = `${API_BASE}/auth/register`;
export const LOGIN = `${API_BASE}/auth/login`;
export const ALLBOOKINGS = `${API_BASE}/holidaze/bookings`;
export const SINGLEBOOKINGS = `${API_BASE}/holidaze/bookings/<id>`;

//Venues

export const ALLVENUES = `${API_BASE}/holidaze/venues`;
export const SINGLEVENUES = `${API_BASE}/holidaze/venues`;
export const SEARCH = `${API_BASE}/holidaze/venues/search?q=<query>`;
