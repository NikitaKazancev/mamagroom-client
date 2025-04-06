import { constantApi } from '@/api/constant/constant.api'
import { fileApi } from '@/api/file/file.api'
import { Language } from '@/i18n/types'
import { Breeds } from '@/modules/breeds/breeds'
import { MainImageSection } from '@/modules/main-image-section/main-image-section'
import { MainPageReviews } from '@/page/main/reviews-section/reviews-section'

export default async function Procedures({
	locale,
	type,
}: {
	locale: Language
	type: 'dogs' | 'cats'
}) {
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
			<MainPageReviews />
		</>
	)
}
