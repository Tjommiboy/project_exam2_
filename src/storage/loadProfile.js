const load = (key) => {
  try {
    return JSON.parse(localStorage.getItem(key));
  } catch {
    return null;
  }
};

export const loadProfile = () => load("profile");
export const loadToken = () => load("accessToken");
