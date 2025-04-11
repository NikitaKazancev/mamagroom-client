import { vacancyApi } from '@/api/vacancy/vacancy.api'
import { Feed } from '@/components/feed/feed'
import { UseTranslation } from '@/components/use-translation/use-translation'
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

	const vacancies = await vacancyApi.findMany({
		language: params.locale,
		isDeleted:
			roles.vacancyDelete || roles.vacancyPut || roles.vacancyPost
				? undefined
				: false,
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
		</>
	)
}
