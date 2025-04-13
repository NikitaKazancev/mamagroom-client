import { masterApi } from '@/api/master/master.api'
import { Cards } from '@/components/cards/cards'
import { UseTranslation } from '@/components/use-translation/use-translation'
import { LINKS } from '@/constants/links.constants'
import { useRoles } from '@/context/my-server-context'
import { Language } from '@/i18n/types'
import { MainImageSection } from '@/modules/main-image-section/main-image-section'
import { buildMetadata, generalPageData } from '@/utils/functions'
import { Metadata, ResolvingMetadata } from 'next'

export async function generateMetadata(
	{
		params,
	}: {
		params: { locale: Language }
	},
	parent: ResolvingMetadata
): Promise<Metadata> {
	return await buildMetadata({
		pageName: 'masters',
		parentMetadata: parent,
		params,
		constantsType: 'mastersPage',
	})
}

const MastersPage = async ({ params }: { params: { locale: Language } }) => {
	const roles = useRoles()
	const { constants, mainImageUrl } = await generalPageData({
		params,
		constantsPageType: 'mastersPage',
		mainImagePageType: 'pages/masters',
	})
	const masters = await masterApi.findMany({
		language: params.locale,
		isDeleted:
			roles.masterDelete || roles.masterPut || roles.masterPost
				? undefined
				: false,
	})

	const schemas = [
		{
			'@context': 'https://schema.org',
			'@type': 'WebPage',
			name: constants.mastersPage_mainTitle,
			description: constants.mastersPage_mainDescription,
			url: `${LINKS.site.url}/${params.locale}/masters`,
		},
		{
			'@context': 'https://schema.org',
			'@type': 'WebPageElement',
			name: constants.mastersPage_mainTitle,
			description: constants.mastersPage_mainDescription,
			url: `${LINKS.site.url}/${params.locale}/masters#main`,
		},
		{
			'@context': 'https://schema.org',
			'@type': 'WebPageElement',
			name: constants.mastersPage_aboutUsTitle,
			description: constants.mastersPage_aboutUsDescription,
			url: `${LINKS.site.url}/${params.locale}/masters#masters`,
		},
		{
			'@context': 'https://schema.org',
			'@type': 'ItemList',
			name: constants.mastersPage_valuesTitle,
			itemListElement: masters.map(master => ({
				'@type': 'ListItem',
				name: `${master.name} (${master.position})`,
				description: master.description,
				image: master.imageName,
			})),
		},
	]

	return (
		<>
			<UseTranslation />
			<MainImageSection
				titleData={{
					language: params.locale,
					type: 'masters-page',
					name: 'main-title',
					value: constants.mastersPage_mainTitle,
				}}
				descriptionData={{
					language: params.locale,
					type: 'masters-page',
					name: 'main-description',
					value: constants.mastersPage_mainDescription,
				}}
				fileUrl={mainImageUrl}
				externalPath='pages/masters/main-bg'
			/>
			<Cards title={'наша команда'} data={masters} />

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

export default MastersPage
