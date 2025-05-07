const load = (key) => {
  const value = localStorage.getItem(key);

  if (!value) return null;

  // Only attempt to parse if value looks like JSON
  if (value.startsWith("{") || value.startsWith("[")) {
    try {
      return JSON.parse(value);
    } catch {
      return value;
    }
  }

  return value; // Return raw string (like a token)
};

export const loadProfile = () => load("profile");
export const loadToken = () => load("accessToken");
