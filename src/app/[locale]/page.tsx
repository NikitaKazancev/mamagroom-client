import { constantApi } from '@/api/constant/constant.api'
import { Language } from '@/i18n/types'
import { MainPageAboutUs } from '@/page/main/about-us-section/about-us-section'
import { MainPageMainSection } from '@/page/main/main-section/main-section'
import { MainPageProcedures } from '@/page/main/procedures/procedures'
import { MainPageReviews } from '@/page/main/reviews-section/reviews-section'
import { MainPageValues } from '@/page/main/values/values'
import { getRoles } from '@/utils/auth/auth'
import { GeneralProps } from '@/utils/types'

export default async function Home({
	params,
}: {
	params: { locale: Language }
}) {
	const roles = await getRoles()
	const generalProps: GeneralProps = { roles, language: params.locale }

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
				title={constants.homePage_mainTitle}
				description={constants.homePage_mainDescription}
				generalProps={generalProps}
			/>
			<MainPageAboutUs
				title={constants.homePage_aboutUsTitle}
				description={constants.homePage_aboutUsDescription}
				generalProps={generalProps}
			/>
			<MainPageProcedures
				dogsTitle={constants.homePage_proceduresForDogsTitle}
				dogsDescription={constants.homePage_proceduresForDogsDescription}
				catsTitle={constants.homePage_proceduresForCatsTitle}
				catsDescription={constants.homePage_proceduresForCatsDescription}
				generalProps={generalProps}
			/>
			<MainPageValues
				title={constants.homePage_valuesTitle}
				generalProps={generalProps}
			/>
			<MainPageReviews generalProps={generalProps} />
		</>
	)
}
