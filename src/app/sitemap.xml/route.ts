import { breedApi } from '@/api/breed/breed.api'
import { LINKS } from '@/constants/links.constants'
import { Language } from '@/i18n/types'
import { ISitemapField, getServerSideSitemap } from 'next-sitemap'

export async function GET(request: Request) {
	const fields: ISitemapField[] = [
		buildSitemap({
			language: 'ru',
			pageUrl: '',
			updatedAt: new Date(2025, 4, 9),
			priority: 1,
		}),
		buildSitemap({
			language: 'en',
			pageUrl: '',
			updatedAt: new Date(2025, 4, 9),
			priority: 1,
		}),
		buildSitemap({
			language: 'ru',
			pageUrl: 'dogs',
			updatedAt: new Date(2025, 4, 9),
			priority: 0.9,
		}),
		buildSitemap({
			language: 'en',
			pageUrl: 'dogs',
			updatedAt: new Date(2025, 4, 9),
			priority: 0.9,
		}),
		buildSitemap({
			language: 'ru',
			pageUrl: 'cats',
			updatedAt: new Date(2025, 4, 9),
			priority: 0.8,
		}),
		buildSitemap({
			language: 'en',
			pageUrl: 'cats',
			updatedAt: new Date(2025, 4, 9),
			priority: 0.8,
		}),
		buildSitemap({
			language: 'ru',
			pageUrl: 'masters',
			updatedAt: new Date(2025, 4, 9),
			priority: 0.7,
		}),
		buildSitemap({
			language: 'en',
			pageUrl: 'masters',
			updatedAt: new Date(2025, 4, 9),
			priority: 0.7,
		}),
		buildSitemap({
			language: 'ru',
			pageUrl: 'vacancies',
			updatedAt: new Date(2025, 4, 9),
			priority: 0.6,
		}),
		buildSitemap({
			language: 'en',
			pageUrl: 'vacancies',
			updatedAt: new Date(2025, 4, 9),
			priority: 0.6,
		}),
	]

	const breeds = await breedApi.findMany({})
	breeds.forEach(breed => {
		fields.push(
			buildSitemap({
				language: breed.language,
				pageUrl: `breeds/${breed.id}`,
				updatedAt: new Date(breed.updatedAt),
				priority: 0.8,
			})
		)
	})

	return getServerSideSitemap(fields)
}

const buildSitemap = ({
	language,
	pageUrl,
	updatedAt,
	priority,
}: {
	language: Language
	pageUrl: string
	updatedAt: Date
	priority: number
}): ISitemapField => {
	const anotherLanguage = language === 'ru' ? 'en' : 'ru'

	return {
		loc: `${LINKS.site.url}/${language}/${pageUrl}`,
		lastmod: updatedAt.toISOString(),
		priority,
		alternateRefs: [
			{
				href: `${LINKS.site.url}/${anotherLanguage}/${pageUrl}`,
				hreflang: anotherLanguage,
			},
			{
				href: `${LINKS.site.url}/${language}/${pageUrl}`,
				hreflang: 'x-default',
			},
		],
		changefreq: 'weekly',
	}
}
