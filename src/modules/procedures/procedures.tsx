import { constantApi } from '@/api/constant/constant.api'
import { fileApi } from '@/api/file/file.api'
import { Language } from '@/i18n/types'
import { Breeds } from '@/modules/breeds/breeds'
import { MainImageSection } from '@/modules/main-image-section/main-image-section'
import { MainPageReviews } from '@/page/main/reviews-section/reviews-section'
import { getRoles } from '@/utils/auth/auth'
import { GeneralProps } from '@/utils/types'

export default async function Procedures({
	locale,
	type,
}: {
	locale: Language
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
			<Breeds type={type} generalProps={generalProps} />
			<MainPageReviews generalProps={generalProps} />
		</>
	)
}
