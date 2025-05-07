import { loadToken } from "./load.js";
export function isLoggedIn() {
  const token = loadToken();
  console.log("🧪 loadToken() value:", token);
  return !!token;
}
