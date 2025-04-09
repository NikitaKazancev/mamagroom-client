import { Language } from '@/i18n/types'
import { Breeds } from '@/modules/breeds/breeds'
import { MainImageSection } from '@/modules/main-image-section/main-image-section'
import { MainPageReviews } from '@/page/main/reviews-section/reviews-section'
import { generalPageData } from '@/utils/functions'

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
