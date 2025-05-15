//API KEY

export const API_KEY = import.meta.env.VITE_API_KEY;

const API_BASE = "https://v2.api.noroff.dev";
export const REGISTER = `${API_BASE}/auth/register`;
export const LOGIN = `${API_BASE}/auth/login`;
export const ALLBOOKINGS = `${API_BASE}/holidaze/bookings`;
export const SINGLEBOOKINGS = `${API_BASE}/holidaze/bookings/<id>`;

//Venues

export const ALLVENUES = `${API_BASE}/holidaze/venues`;
export const SINGLEVENUES = `${API_BASE}/holidaze/venues`;
export const SEARCH = `${API_BASE}/holidaze/venues/search?q=<query>`;
export const CREATE_VENUE = `${API_BASE}/holidaze/venues`;

//Profiles

export const PROFILE = `${API_BASE}/holidaze/profiles`;
export const UPDATE_PROFILE = `${API_BASE}/holidaze/profiles`;
