import { constantApi } from '@/api/constant/constant.api'
import { fileApi } from '@/api/file/file.api'
import { vacancyApi } from '@/api/vacancy/vacancy.api'
import { Feed } from '@/components/feed/feed'
import { useRoles } from '@/context/my-server-context'
import { Language } from '@/i18n/types'
import { MainImageSection } from '@/modules/main-image-section/main-image-section'
import { MainPageReviews } from '@/page/main/reviews-section/reviews-section'
import { Metadata } from 'next'

export async function generateMetadata({
	params,
}: {
	params: { locale: string }
}): Promise<Metadata> {
	const constants = await constantApi.findMany({
		language: params.locale as Language,
		type: 'vacanciesPage',
	})

	return {
		title: constants?.vacanciesPage_mainTitle,
		description: constants?.vacanciesPage_mainDescription,
	}
}

export default async function Vacancies({
	params,
}: {
	params: { locale: Language }
}) {
	const roles = useRoles()

	const constants = await constantApi.findMany({
		language: params.locale,
		type: 'vacanciesPage',
	})
	if (!constants) {
		return null
	}

	const mainImageUrl = await fileApi.findDestination(
		'pages/vacancies',
		'main-bg'
	)

	const vacancies = await vacancyApi.findMany({
		language: params.locale,
		isDeleted:
			roles.vacancyDelete || roles.vacancyPut || roles.vacancyPost
				? undefined
				: false,
	})

	return (
		<>
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
			<MainPageReviews />
		</>
	)
}
