export const loadFromStorage = <T>(key: string): T | null => {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : null;
};

export const saveStorage = <T>(key: string, data: T): void => {
  localStorage.setItem(key, JSON.stringify(data));
};