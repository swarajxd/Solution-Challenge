export const generateId = () => {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  // Fallback for older environments or when crypto is unavailable
  return 'id-' + Math.random().toString(36).substring(2, 15);
};
