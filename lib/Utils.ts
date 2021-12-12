export function convertToSlug(text: string): string {
  return text.toLowerCase()
    .replace(/-/g, ' ')
    .replace(/ +/g, '-')
    .replace(/[^\w-]+/g, '');
}
