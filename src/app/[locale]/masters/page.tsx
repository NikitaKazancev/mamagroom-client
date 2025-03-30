import { constantApi } from '@/api/constant/constant.api'
import { fileApi } from '@/api/file/file.api'
import { masterApi } from '@/api/master/master.api'
import { Cards } from '@/components/cards/cards'
import { Language } from '@/i18n/types'
import { MainImageSection } from '@/modules/main-image-section/main-image-section'
import { MainPageReviews } from '@/page/main/reviews-section/reviews-section'
import { getRoles } from '@/utils/auth/auth'
import { GeneralProps } from '@/utils/types'
import { Metadata } from 'next'

export async function generateMetadata({
	params,
}: {
	params: { locale: string }
}): Promise<Metadata> {
	const constants = await constantApi.findMany({
		language: params.locale as Language,
		type: 'mastersPage',
	})

	return {
		title: constants?.mastersPage_mainTitle,
		description: constants?.mastersPage_mainDescription,
	}
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

	const masters = await masterApi.findMany({
		language: params.locale,
		isDeleted:
			roles.masterDelete || roles.masterPut || roles.masterPost
				? undefined
				: false,
	})

	return (
		<>
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
				generalProps={generalProps}
				fileUrl={mainImageUrl}
				externalPath='pages/masters/main-bg'
			/>
			<Cards
				title={'наша команда'}
				data={masters}
				generalProps={generalProps}
			/>
			<MainPageReviews generalProps={generalProps} />
		</>
	)
}

export default MastersPage
