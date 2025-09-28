/**
 * Truncate long text
 * @param {string} text
 * @param {number} length
 */
export function truncateText(text, length = 100) {
  if (!text) return "";
  return text.length > length ? text.slice(0, length) + "..." : text;
}

/**
 * Format date string to readable format
 * @param {string|Date} date
 */
export function formatDate(date) {
  if (!date) return "";
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric"
  });
}
