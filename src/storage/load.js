function load(key) {
  return localStorage.getItem(key); // ✅ no JSON.parse
}
export function loadToken() {
  return load("accessToken");
}
