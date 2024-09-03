export default async function sitemap() {
  const baseUrl = 'https://gists.app'
  return [
    {
      url: baseUrl,
      lastModified: new Date(),
    },
  ]
}
