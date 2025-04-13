import { valueApi } from '@/api/values/values.api'
import { UseTranslation } from '@/components/use-translation/use-translation'
import { LINKS } from '@/constants/links.constants'
import { Language } from '@/i18n/types'
import { MainImageSection } from '@/modules/main-image-section/main-image-section'
import { MainPageAboutUs } from '@/page/main/about-us-section/about-us-section'
import { MainPageProcedures } from '@/page/main/procedures/procedures'
import { MainPageValues } from '@/page/main/values/values'
import { generalPageData } from '@/utils/functions'

export default async function Home({
	params,
}: {
	params: { locale: Language }
}) {
	const { constants, mainImageUrl } = await generalPageData({
		params,
		constantsPageType: 'homePage',
		mainImagePageType: 'pages/home',
	})
	const values = await valueApi.findMany({
		isDeleted: false,
		language: params.locale,
	})

	const schemas = [
		{
			'@context': 'https://schema.org',
			'@type': 'WebPage',
			name: constants.homePage_mainTitle,
			description: constants.homePage_mainDescription,
			url: `${LINKS.site.url}/${params.locale}`,
		},
		{
			'@context': 'https://schema.org',
			'@type': 'WebPageElement',
			name: constants.homePage_mainTitle,
			description: constants.homePage_mainDescription,
			url: `${LINKS.site.url}/${params.locale}#main`,
		},
		{
			'@context': 'https://schema.org',
			'@type': 'WebPageElement',
			name: constants.homePage_aboutUsTitle,
			description: constants.homePage_aboutUsDescription,
			url: `${LINKS.site.url}/${params.locale}#about`,
		},
		{
			'@context': 'https://schema.org',
			'@type': 'VideoObject',
			name: constants.homePage_proceduresForDogsTitle,
			description: constants.homePage_proceduresForDogsDescription,
			uploadDate: '2025-04-13',
			contentUrl: `${LINKS.site.url}/video/dogs/video.mp4`,
			embedUrl: `${LINKS.site.url}/${params.locale}#procedures`,
		},
		{
			'@context': 'https://schema.org',
			'@type': 'VideoObject',
			name: constants.homePage_proceduresForCatsTitle,
			description: constants.homePage_proceduresForCatsDescription,
			uploadDate: '2025-04-13',
			contentUrl: `${LINKS.site.url}/video/cats/video.mp4`,
			embedUrl: `${LINKS.site.url}/${params.locale}#procedures`,
		},
		{
			'@context': 'https://schema.org',
			'@type': 'ItemList',
			name: constants.homePage_valuesTitle,
			itemListElement: values.map(value => ({
				'@type': 'ListItem',
				name: value.title,
				description: value.description,
				image: value.imageName,
			})),
		},
	]

	return (
		<>
			<UseTranslation />
			<MainImageSection
				titleData={{
					type: 'home-page',
					name: 'main-title',
					value: constants.homePage_mainTitle,
				}}
				descriptionData={{
					type: 'home-page',
					name: 'main-description',
					value: constants.homePage_mainDescription,
				}}
				fileUrl={mainImageUrl}
				externalPath='pages/home/main-bg'
			/>
			<MainPageAboutUs
				title={constants.homePage_aboutUsTitle}
				description={constants.homePage_aboutUsDescription}
			/>
			<MainPageProcedures
				dogsTitle={constants.homePage_proceduresForDogsTitle}
				dogsDescription={constants.homePage_proceduresForDogsDescription}
				catsTitle={constants.homePage_proceduresForCatsTitle}
				catsDescription={constants.homePage_proceduresForCatsDescription}
			/>
			<MainPageValues title={constants.homePage_valuesTitle} />

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
