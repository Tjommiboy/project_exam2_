function remove(key) {
  localStorage.removeItem(key);
}

export function removeToken() {
  remove("token");
  remove("accessToken");
}
