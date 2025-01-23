import { ISitemapField, getServerSideSitemap } from 'next-sitemap'

export async function GET(request: Request) {
	const url = 'https://mamagroom.ru'

	const fields: ISitemapField[] = [
		{
			loc: url,
			lastmod: new Date(2025, 1, 1).toISOString(),
			priority: 0.9,
		},
	]

	// request -> push -> fields

	return getServerSideSitemap(fields)
}
