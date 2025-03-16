import { constantApi } from '@/api/constant/constant.api'
import { fileApi } from '@/api/file/file.api'
import { Language } from '@/i18n/types'
import { MainImageSection } from '@/modules/main-image-section/main-image-section'
import { Prices } from '@/modules/prices/prices'
import { MainPageReviews } from '@/page/main/reviews-section/reviews-section'
import { getRoles } from '@/utils/auth/auth'
import { GeneralProps } from '@/utils/types'
import { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'User Management',
	description: 'Manage system users and their roles',
}

export default async function ProceduresById({
	locale,
	id,
	type,
}: {
	locale: Language
	id: string
	type: 'dogs' | 'cats'
}) {
	const roles = await getRoles()
	const generalProps: GeneralProps = { roles, language: locale }

	const constants = await constantApi.findMany({
		language: locale,
		type: `${type}Page`,
	})

	if (!constants) {
		return null
	}

	const mainImageUrl = await fileApi.findDestination(
		`pages/${type}`,
		'main-bg'
	)

	return (
		<>
			<MainImageSection
				titleData={{
					language: locale,
					type: `${type}-page`,
					name: 'main-title',
					value: constants[`${type}Page_mainTitle`],
					settingsTitle: 'Главный заголовок',
				}}
				descriptionData={{
					language: locale,
					type: `${type}-page`,
					name: 'main-description',
					value: constants[`${type}Page_mainDescription`],
					settingsDescription: 'Главное описание',
				}}
				generalProps={generalProps}
				fileUrl={mainImageUrl}
				externalPath={`pages/${type}/main-bg`}
			/>
			<Prices id={id} type={type} generalProps={generalProps} />
			<MainPageReviews generalProps={generalProps} />
		</>
	)
}
