import { loadToken } from "./load.js";
export function isLoggedIn() {
  const token = loadToken();

  return !!token;
}
