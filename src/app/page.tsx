import { Footer } from '@/modules/footer/footer'
import { Header } from '@/modules/header/header'
import { MainAboutUsSection } from '@/pages/main/about-us-section/about-us-section'
import { MainMainSection } from '@/pages/main/main-section/main-section'
import { MainProcedures } from '@/pages/main/procedures/procedures'
import { MainReviewsSection } from '@/pages/main/reviews-section/reviews-section'

export default function Home() {
	return (
		<>
			<Header />
			<main>
				<MainMainSection />
				<MainAboutUsSection />
				<MainProcedures />
				<MainReviewsSection />
			</main>
			<Footer />
		</>
	)
}
