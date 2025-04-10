import { Language } from '@/i18n/types'
import { Breeds } from '@/modules/breeds/breeds'
import { generalPageData } from '@/utils/functions'
import { MainImageSection } from '../main-image-section/main-image-section'
import { UseTranslation } from '@/components/use-translation/use-translation'

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
			<UseTranslation />
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
		</>
	)
}
