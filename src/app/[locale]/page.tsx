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

export default async function Home({
	params,
}: {
	params: { locale: Language }
}) {
	const navLinks = await headerNavbarLinkAPI.findMany({
		language: params.locale,
	})

	return (
		<>
			<FullTransparentBlock />
			<Header language={params.locale} navLinks={navLinks} />
			<main>
				<MainMainSection language={params.locale} />
				<MainAboutUsSection />
				<MainProcedures />
				<ValuesMainSection />
				<MainReviewsSection />
			</main>
			<Footer />
		</>
	)
}
