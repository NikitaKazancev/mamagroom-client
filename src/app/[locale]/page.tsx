import { constantAPI } from '@/api/constant/constant.api'
import { FullTransparentBlock } from '@/components/full-transparent-block/full-transparent-block'
import { Footer } from '@/modules/footer/footer'
import { Header } from '@/modules/header/header'
import { MainAboutUsSection } from '@/page/main/about-us-section/about-us-section'
import { MainMainSection } from '@/page/main/main-section/main-section'
import { MainProcedures } from '@/page/main/procedures/procedures'
import { MainReviewsSection } from '@/page/main/reviews-section/reviews-section'
import { ValuesMainSection } from '@/page/main/values/values'

export default async function Home({ params }: { params: { locale: string } }) {
	const navLinks = await constantAPI.findHeaderNavLinks({
		lang: params.locale,
	})

	return (
		<>
			<FullTransparentBlock />
			<Header lang={params.locale} navLinks={navLinks} />
			<main>
				<MainMainSection />
				<MainAboutUsSection />
				<MainProcedures />
				<ValuesMainSection />
				<MainReviewsSection />
			</main>
			<Footer />
		</>
	)
}
