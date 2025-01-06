import { constantApi } from '@/api/constant/constant.api'
import { Language } from '@/i18n'
import { MainPageAboutUs } from '@/page/main/about-us-section/about-us-section'
import { MainPageMainSection } from '@/page/main/main-section/main-section'
import { MainPageProcedures } from '@/page/main/procedures/procedures'
import { MainPageReviews } from '@/page/main/reviews-section/reviews-section'
import { MainPageValues } from '@/page/main/values/values'

export default async function Home({
	params,
}: {
	params: { locale: Language }
}) {
	const constants = await constantApi.findMany({
		language: params.locale,
		type: 'homePage',
	})

	if (!constants) {
		return null
	}

	return (
		<>
			<MainPageMainSection
				language={params.locale}
				title={constants.homePage_mainTitle}
				description={constants.homePage_mainDescription}
			/>
			<MainPageAboutUs
				title={constants.homePage_aboutUsTitle}
				description={constants.homePage_aboutUsDescription}
				language={params.locale}
			/>
			<MainPageProcedures
				dogsTitle={constants.homePage_proceduresForDogsTitle}
				dogsDescription={constants.homePage_proceduresForDogsDescription}
				catsTitle={constants.homePage_proceduresForCatsTitle}
				catsDescription={constants.homePage_proceduresForCatsDescription}
			/>
			<MainPageValues
				language={params.locale}
				title={constants.homePage_valuesTitle}
			/>
			<MainPageReviews />
		</>
	)
}
