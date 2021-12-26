export function convertToSlug(text) {
  return text
    .toLowerCase()
    .replace(/-/g, " ")
    .replace(/ +/g, "-")
    .replace(/[^\w-]+/g, "");
}
