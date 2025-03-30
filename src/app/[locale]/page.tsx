import { constantApi } from '@/api/constant/constant.api'
import { fileApi } from '@/api/file/file.api'
import { Language } from '@/i18n/types'
import { MainImageSection } from '@/modules/main-image-section/main-image-section'
import { MainPageAboutUs } from '@/page/main/about-us-section/about-us-section'
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

	const mainImageUrl = await fileApi.findDestination('pages/home', 'main-bg')

	return (
		<>
			<MainImageSection
				titleData={{
					language: params.locale,
					type: 'home-page',
					name: 'main-title',
					value: constants.homePage_mainTitle,
				}}
				descriptionData={{
					language: params.locale,
					type: 'home-page',
					name: 'main-description',
					value: constants.homePage_mainDescription,
				}}
				generalProps={generalProps}
				fileUrl={mainImageUrl}
				externalPath='pages/home/main-bg'
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
