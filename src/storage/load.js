function load(key) {
  try {
    return JSON.parse(localStorage.getItem(key));
  } catch {
    return null;
  }
}
export function loadToken() {
  return load("accessToken");
}
