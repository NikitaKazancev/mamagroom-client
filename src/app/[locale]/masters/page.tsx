import { constantApi } from '@/api/constant/constant.api'
import { fileApi } from '@/api/file/file.api'
import { masterApi } from '@/api/master/master.api'
import { Cards } from '@/components/cards/cards'
import { Language } from '@/i18n/types'
import { MainImageSection } from '@/modules/main-image-section/main-image-section'
import { MainPageReviews } from '@/page/main/reviews-section/reviews-section'
import { getRoles } from '@/utils/auth/auth'
import { GeneralProps } from '@/utils/types'

export const metadata = {
	title: 'Our Expert Team | Your Company',
	description:
		'Meet our team of expert professionals dedicated to providing exceptional service and results.',
}

const MastersPage = async ({ params }: { params: { locale: Language } }) => {
	const roles = await getRoles()
	const generalProps: GeneralProps = { roles, language: params.locale }

	const constants = await constantApi.findMany({
		language: params.locale,
		type: 'mastersPage',
	})

	if (!constants) {
		return null
	}

	const mainImageUrl = await fileApi.findDestination(
		'pages/masters',
		'main-bg'
	)

	const masters = await masterApi.findMany({ language: params.locale })

	return (
		<>
			<MainImageSection
				titleData={{
					language: params.locale,
					type: 'masters-page',
					name: 'main-title',
					value: constants.mastersPage_mainTitle,
					settingsTitle: 'Главный заголовок',
				}}
				descriptionData={{
					language: params.locale,
					type: 'masters-page',
					name: 'main-description',
					value: constants.mastersPage_mainDescription,
					settingsDescription: 'Главное описание',
				}}
				generalProps={generalProps}
				fileUrl={mainImageUrl}
				externalPath='pages/masters/main-bg'
			/>
			<Cards title={'наша команда'} data={masters} />
			<MainPageReviews generalProps={generalProps} />
		</>
	)
}

export default MastersPage
