import { constantApi } from '@/api/constant/constant.api'
import { fileApi } from '@/api/file/file.api'
import { vacancyApi } from '@/api/vacancy/vacancy.api'
import { Feed } from '@/components/feed/feed'
import { Language } from '@/i18n/types'
import { MainImageSection } from '@/modules/main-image-section/main-image-section'
import { MainPageReviews } from '@/page/main/reviews-section/reviews-section'
import { getRoles } from '@/utils/auth/auth'
import { GeneralProps } from '@/utils/types'

export default async function Vacancies({
	params,
}: {
	params: { locale: Language }
}) {
	const roles = await getRoles()
	const generalProps: GeneralProps = { roles, language: params.locale }

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
			generalProps.roles.vacancyDelete ||
			generalProps.roles.vacancyPut ||
			generalProps.roles.vacancyPost
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
				generalProps={generalProps}
				fileUrl={mainImageUrl}
				externalPath='pages/vacancies/main-bg'
			/>
			<Feed data={vacancies} />
			<MainPageReviews generalProps={generalProps} />
		</>
	)
}
