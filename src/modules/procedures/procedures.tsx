import { breedApi } from '@/api/breed/breed.api'
import { UseTranslation } from '@/components/use-translation/use-translation'
import { LINKS } from '@/constants/links.constants'
import { Language } from '@/i18n/types'
import { Breeds } from '@/modules/breeds/breeds'
import { generalPageData } from '@/utils/functions'
import { MainImageSection } from '../main-image-section/main-image-section'

export default async function Procedures({
	locale,
	type,
}: {
	locale: Language
	type: 'dogs' | 'cats'
}) {
	const { constants, mainImageUrl } = await generalPageData({
		params: { locale },
		constantsPageType: `${type}Page`,
		mainImagePageType: `pages/${type}`,
	})
	const breeds = await breedApi.findMany({
		language: locale,
		type,
		isDeleted: false,
	})

	const schemas = [
		{
			'@context': 'https://schema.org',
			'@type': 'WebPage',
			name: constants.dogsPage_mainTitle,
			description: constants.dogsPage_mainDescription,
			url: `${LINKS.site.url}/${locale}/dogs`,
		},
		{
			'@context': 'https://schema.org',
			'@type': 'WebPageElement',
			name: constants.dogsPage_mainTitle,
			description: constants.dogsPage_mainDescription,
			url: `${LINKS.site.url}/${locale}/dogs#main`,
		},
		{
			'@context': 'https://schema.org',
			'@type': 'WebPageElement',
			name: constants.dogsPage_aboutUsTitle,
			description: constants.dogsPage_aboutUsDescription,
			url: `${LINKS.site.url}/${locale}/dogs#breeds`,
		},
		{
			'@context': 'https://schema.org',
			'@type': 'ItemList',
			name: constants.dogsPage_valuesTitle,
			itemListElement: breeds.map(breed => ({
				'@type': 'ListItem',
				name: breed.name,
			})),
		},
	]

	return (
		<>
			<UseTranslation />
			<MainImageSection
				titleData={{
					language: locale,
					type: `${type}-page`,
					name: 'main-title',
					value: constants[`${type}Page_mainTitle`],
				}}
				descriptionData={{
					language: locale,
					type: `${type}-page`,
					name: 'main-description',
					value: constants[`${type}Page_mainDescription`],
				}}
				fileUrl={mainImageUrl}
				externalPath={`pages/${type}/main-bg`}
			/>
			<Breeds type={type} />

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
