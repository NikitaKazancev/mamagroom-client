import { fileAPI } from '@/api/file/file.api'
import { Slider } from '@/modules/slider/slider'
import { Layout } from '@/ui/layout/layout'
import { SectionTitle } from '@/ui/section-title/section-title'
import { Section } from '@/ui/section/section'
import styles from './about-us-section.module.scss'

type Props = {
	title: string
	description: string
}

export const MainAboutUsSection = async ({ title, description }: Props) => {
	const slideURLs = await fileAPI.findSliderAboutUsDestinations()

	return (
		<Section className={styles.main} pTop={false}>
			<Layout>
				<div className={styles.content}>
					<div className={styles.left}>
						<SectionTitle text={title} color='blue' />
						<h4>{description}</h4>
					</div>

					<div className={styles.right}>
						<Slider urls={slideURLs} />
					</div>
				</div>
			</Layout>
		</Section>
	)
}
