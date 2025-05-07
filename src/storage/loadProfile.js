const load = (key) => {
  const value = localStorage.getItem(key);

  if (!value) return null;

  if (value.startsWith("{") || value.startsWith("[")) {
    try {
      return JSON.parse(value);
    } catch {
      return value;
    }
  }

  return value;
};

export const loadProfile = () => load("profile");
export const loadToken = () => load("accessToken");
