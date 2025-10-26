export const storage = {
  get: (key, fallback) => {
    const item = localStorage.getItem(key);
    try {
      return item ? JSON.parse(item) : fallback;
    } catch {
      fallback;
    }
  },
  set: (key, value) => localStorage.setItem(key, JSON.stringify(value)),
  remove: (key) => localStorage.removeItem(key),
};
