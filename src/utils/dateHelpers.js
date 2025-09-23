export const formatDate = (dateValue) => {
  if (!dateValue) return "data missing";
  // If dateValue is an Excel date number (e.g., 44927)
  if (typeof dateValue === "number") {
    const excelEpoch = new Date(Date.UTC(0, 0, dateValue - 1));
    return excelEpoch.toLocaleDateString("de-DE");
  }
  // If dateValue is already a Date object or ISO string
  const date = new Date(dateValue);
  if (isNaN(date.getTime())) {
    return "data missing";
  }
  return date.toLocaleDateString("de-DE");
};
