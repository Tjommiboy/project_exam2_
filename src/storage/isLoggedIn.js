import { loadToken } from "./load.js";
export function isLoggedIn() {
  return !!loadToken();
}
