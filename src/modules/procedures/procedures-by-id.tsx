import { breedApi } from '@/api/breed/breed.api'
import { Language } from '@/i18n/types'
import { Prices } from '@/modules/prices/prices'
import { MainPageReviews } from '@/page/main/reviews-section/reviews-section'
import { generalPageData } from '@/utils/functions'
import { ImageSectionWithoutChange } from '../main-image-section/image-section-without-change/image-section-without-change'

export default async function ProceduresById({
	locale,
	id,
	type,
}: {
	locale: Language
	id: string
	type: 'dogs' | 'cats'
}) {
	const { mainImageUrl } = await generalPageData({
		params: { locale },
		constantsPageType: `${type}Page`,
		mainImagePageType: `pages/${type}`,
	})
	const breed = await breedApi.findById(id)

	return (
		<>
			<ImageSectionWithoutChange
				title={breed?.name}
				fileUrl={mainImageUrl}
			/>
			<Prices id={id} type={type} />
			<MainPageReviews />
		</>
	)
}
