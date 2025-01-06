import { mainSliderApi } from '@/api/main-slider/main-slider.api'
import { Language } from '@/i18n'
import { Slider } from '@/modules/slider/slider'
import { Layout } from '@/ui/layout/layout'
import { Section } from '@/ui/section/section'
import styles from './about-us-section.module.scss'

type Props = {
	title: string
	description: string
	language: Language
}

export const MainPageAboutUs = async ({
	title,
	description,
	language,
}: Props) => {
	const slideURLs = await mainSliderApi.findMany({ isDeleted: false })
	const urls = slideURLs.map(data => data.imageName)

	return (
		<Section className={styles.main} pTop={false}>
			<Layout>
				<div className={styles.content}>
					<div className={styles.left}>
						{/* <SettingsConstant
							data={{
								language,
								type: 'home-page',
								name: 'about-us-title',
								value: title,
							}}
							title='О нас'
							iconClassname={styles.settings}
						>
							<SectionTitle text={title} color='blue' />
						</SettingsConstant> */}
						<h4>{description}</h4>
					</div>

					<div className={styles.right}>
						<Slider urls={urls} />
					</div>
				</div>
			</Layout>
		</Section>
	)
}
