import { fileAPI } from '@/api/file/file.api'
import { Slider } from '@/modules/slider/slider'
import { Layout } from '@/ui/layout/layout'
import { SectionTitle } from '@/ui/section-title/section-title'
import { Section } from '@/ui/section/section'
import styles from './about-us-section.module.scss'

export const MainAboutUsSection = async () => {
	const slideURLs = await fileAPI.findDestinationsSliderAboutUs()

	return (
		<Section className={styles.main} pTop={false}>
			<Layout>
				<div className={styles.content}>
					<div className={styles.left}>
						<SectionTitle text='о нас' color='blue' />
						<h4>
							В рамках спецификации современных стандартов, интерактивные
							прототипы освещают чрезвычайно интересные особенности
							картины в целом, однако конкретные выводы, разумеется,
							объективно рассмотрены соответствующими инстанциями. Не
							следует, однако, забывать, что
						</h4>
					</div>

					<div className={styles.right}>
						<Slider urls={slideURLs} />
					</div>
				</div>
			</Layout>
		</Section>
	)
}
