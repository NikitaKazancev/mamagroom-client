import { YandexReviews } from '@/components/yandex/reviews/yandex-reviews'
import { Layout } from '@/ui/layout/layout'

import { Section } from '@/ui/section/section'
import styles from './reviews-section.module.scss'

export const MainReviewsSection = () => {
	return (
		<Section pBottom={false}>
			<Layout className={styles.main}>
				<div className={styles.right}>
					<YandexReviews className={styles.reviews} />
				</div>
			</Layout>
		</Section>
	)
}
