import { vacancyApi } from '@/api/vacancy/vacancy.api'
import { Feed } from '@/components/feed/feed'
import { UseTranslation } from '@/components/use-translation/use-translation'
import { LINKS } from '@/constants/links.constants'
import { useRoles } from '@/context/my-server-context'
import { Language } from '@/i18n/types'
import { MainImageSection } from '@/modules/main-image-section/main-image-section'
import { buildMetadata, generalPageData } from '@/utils/functions'
import { Metadata, ResolvingMetadata } from 'next'
import { getTranslations } from 'next-intl/server'

export async function generateMetadata(
	{
		params,
	}: {
		params: { locale: Language }
	},
	parent: ResolvingMetadata
): Promise<Metadata> {
	return await buildMetadata({
		pageName: 'vacancies',
		parentMetadata: parent,
		params,
		constantsType: 'vacanciesPage',
	})
}

export default async function Vacancies({
	params,
}: {
	params: { locale: Language }
}) {
	const roles = useRoles()
	const { constants, mainImageUrl } = await generalPageData({
		params,
		constantsPageType: 'vacanciesPage',
		mainImagePageType: 'pages/vacancies',
	})
	const metadata = await getTranslations('Metadata')

	const vacancies = await vacancyApi.findMany({
		language: params.locale,
		isDeleted:
			roles.vacancyDelete || roles.vacancyPut || roles.vacancyPost
				? undefined
				: false,
	})

	const schemas = [
		{
			'@context': 'https://schema.org',
			'@type': 'WebPage',
			name: constants.vacanciesPage_mainTitle,
			description: constants.vacanciesPage_mainDescription,
			url: `${LINKS.site.url}/${params.locale}/vacancies`,
		},
		{
			'@context': 'https://schema.org',
			'@type': 'WebPageElement',
			name: constants.vacanciesPage_mainTitle,
			description: constants.vacanciesPage_mainDescription,
			url: `${LINKS.site.url}/${params.locale}/vacancies#main`,
		},
		{
			'@context': 'https://schema.org',
			'@type': 'WebPageElement',
			name: constants.vacanciesPage_mainTitle,
			description: metadata('vacanciesDescription'),
			url: `${LINKS.site.url}/${params.locale}/vacancies#vacancies`,
		},
	] as any[]
	vacancies.forEach(review => {
		schemas.push({
			'@context': 'https://schema.org',
			'@type': 'JobPosting',
			title: review.name,
			description: review.description,
			url: review.link,
		})
	})

	return (
		<>
			<UseTranslation />
			<MainImageSection
				titleData={{
					language: params.locale,
					type: 'vacancies-page',
					name: 'main-title',
					value: constants.vacanciesPage_mainTitle,
				}}
				descriptionData={{
					language: params.locale,
					type: 'vacancies-page',
					name: 'main-description',
					value: constants.vacanciesPage_mainDescription,
				}}
				fileUrl={mainImageUrl}
				externalPath='pages/vacancies/main-bg'
			/>
			<Feed data={vacancies} />

			{schemas.map((schema, index) => (
				<script
					key={index}
					type='application/ld+json'
					suppressHydrationWarning
					dangerouslySetInnerHTML={{
						__html: JSON.stringify(schema),
					}}
				/>
			))}
		</>
	)
}
