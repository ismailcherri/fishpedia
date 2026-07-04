// Resolves the bundled SVG illustration for a species at build time.
const images = import.meta.glob('../assets/fish/*.svg', {
  eager: true,
  query: '?url',
  import: 'default',
}) as Record<string, string>

export function fishImageUrl(svgFileName: string): string {
  const url = images[`../assets/fish/${svgFileName}`]
  if (!url) throw new Error(`Missing fish illustration: ${svgFileName}`)
  return url
}
