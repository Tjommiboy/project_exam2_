export function save(key, value) {
  // Only JSON.stringify if the value is an object
  const isObject = typeof value === "object" && value !== null;
  localStorage.setItem(key, isObject ? JSON.stringify(value) : value);
}
