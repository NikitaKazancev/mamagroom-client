import { Footer } from '@/modules/footer/footer'
import { Header } from '@/modules/header/header'
import { MainAboutUsSection } from '@/page/main/about-us-section/about-us-section'
import { MainMainSection } from '@/page/main/main-section/main-section'
import { MainReviewsSection } from '@/page/main/reviews-section/reviews-section'
import { ValuesMainSection } from '@/page/main/values/values'

export default function Home() {
	return (
		<>
			<Header />
			<main>
				<MainMainSection />
				<MainAboutUsSection />
				{/* <MainProcedures /> */}
				<ValuesMainSection />
				<MainReviewsSection />
			</main>
			<Footer />
		</>
	)
}
