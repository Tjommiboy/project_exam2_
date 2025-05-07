export function save(key, value) {
  const isObject = typeof value === "object" && value !== null;
  localStorage.setItem(key, isObject ? JSON.stringify(value) : value);
}
