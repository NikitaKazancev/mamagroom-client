import { constantAPI } from '@/api/constant/constant.api'
import { CONSTANT_TYPES } from '@/api/constant/constant.types'
import { headerNavbarLinkAPI } from '@/api/header-navbar-link/header-navbar-link.api'
import { FullTransparentBlock } from '@/components/full-transparent-block/full-transparent-block'
import { Language } from '@/i18n'
import { Footer } from '@/modules/footer/footer'
import { Header } from '@/modules/header/header'
import { MainAboutUsSection } from '@/page/main/about-us-section/about-us-section'
import { MainMainSection } from '@/page/main/main-section/main-section'
import { MainProcedures } from '@/page/main/procedures/procedures'
import { MainReviewsSection } from '@/page/main/reviews-section/reviews-section'
import { ValuesMainSection } from '@/page/main/values/values'
import { getTranslations } from 'next-intl/server'

export default async function Home({
	params,
}: {
	params: { locale: Language }
}) {
	const navLinks = await headerNavbarLinkAPI.findMany({
		language: params.locale,
	})
	const constants = await constantAPI.findByType({
		language: params.locale,
		type: CONSTANT_TYPES.homePage,
	})

	const t = await getTranslations('General')

	return (
		<>
			<FullTransparentBlock />
			<Header translations={{ book: t('book') }} navLinks={navLinks} />
			<main>
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
			</main>
			<Footer />
		</>
	)
}
