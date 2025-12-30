export const formatDateInput = (date?: string) => {
  return date ? new Date(date).toLocaleDateString() : "";
};

export const toDateInputValue = (value?: string | Date | null) => {
  if (!value) return "";
  const d = new Date(value);
  if (isNaN(d.getTime())) return "";
  return d.toISOString().slice(0, 10);
};
