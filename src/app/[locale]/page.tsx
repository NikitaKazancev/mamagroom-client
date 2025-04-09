import { Language } from '@/i18n/types'
import { MainImageSection } from '@/modules/main-image-section/main-image-section'
import { MainPageAboutUs } from '@/page/main/about-us-section/about-us-section'
import { MainPageProcedures } from '@/page/main/procedures/procedures'
import { MainPageReviews } from '@/page/main/reviews-section/reviews-section'
import { MainPageValues } from '@/page/main/values/values'
import { generalPageData } from '@/utils/functions'

export default async function Home({
	params,
}: {
	params: { locale: Language }
}) {
	const { constants, mainImageUrl } = await generalPageData({
		params,
		constantsPageType: 'homePage',
		mainImagePageType: 'pages/home',
	})

	return (
		<>
			<MainImageSection
				titleData={{
					type: 'home-page',
					name: 'main-title',
					value: constants.homePage_mainTitle,
				}}
				descriptionData={{
					type: 'home-page',
					name: 'main-description',
					value: constants.homePage_mainDescription,
				}}
				fileUrl={mainImageUrl}
				externalPath='pages/home/main-bg'
			/>
			<MainPageAboutUs
				title={constants.homePage_aboutUsTitle}
				description={constants.homePage_aboutUsDescription}
			/>
			<MainPageProcedures
				dogsTitle={constants.homePage_proceduresForDogsTitle}
				dogsDescription={constants.homePage_proceduresForDogsDescription}
				catsTitle={constants.homePage_proceduresForCatsTitle}
				catsDescription={constants.homePage_proceduresForCatsDescription}
			/>
			<MainPageValues title={constants.homePage_valuesTitle} />
			<MainPageReviews />
		</>
	)
}
