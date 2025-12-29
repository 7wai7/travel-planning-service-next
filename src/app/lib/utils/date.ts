export const formatDateInput = (date?: string) => {
  return date? new Date(date).toLocaleDateString() : ""
}
