export const formatDate = (mongoDate) => {
  if (!mongoDate) return "";

  const date = new Date(mongoDate);
  const options = { year: "numeric", month: "short", day: "numeric" };

  return date.toLocaleDateString("en-US", options);
};
