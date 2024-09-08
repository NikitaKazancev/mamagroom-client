import { constantAPI } from '@/api/constant/constant.api'
import { CONSTANT_TYPES } from '@/api/constant/constant.types'
import { Language } from '@/i18n'
import { MainAboutUsSection } from '@/page/main/about-us-section/about-us-section'
import { MainMainSection } from '@/page/main/main-section/main-section'
import { MainProcedures } from '@/page/main/procedures/procedures'
import { MainReviewsSection } from '@/page/main/reviews-section/reviews-section'
import { ValuesMainSection } from '@/page/main/values/values'

export default async function Home({
	params,
}: {
	params: { locale: Language }
}) {
	const constants = await constantAPI.findByType({
		language: params.locale,
		type: CONSTANT_TYPES.homePage,
	})

	return (
		<>
			<MainMainSection
				language={params.locale}
				title={constants.mainTitle}
				description={constants.mainDescription}
			/>
			<MainAboutUsSection
				title={constants.aboutUsTitle}
				description={constants.aboutUsDescription}
			/>
			<MainProcedures
				dogsTitle={constants.proceduresForDogsTitle}
				dogsDescription={constants.proceduresForDogsDescription}
				catsTitle={constants.proceduresForCatsTitle}
				catsDescription={constants.proceduresForCatsDescription}
			/>
			<ValuesMainSection
				language={params.locale}
				title={constants.valuesTitle}
			/>
			<MainReviewsSection />
		</>
	)
}
