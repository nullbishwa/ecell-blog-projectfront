/**
 * Convert string to slug
 * @param {string} text
 */
export function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")      // Replace spaces with -
    .replace(/[^\w-]+/g, "")   // Remove non-word chars
    .replace(/--+/g, "-");     // Replace multiple - with single -
}
