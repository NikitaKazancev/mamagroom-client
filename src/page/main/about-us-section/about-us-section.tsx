import { mainSliderApi } from '@/api/main-slider/main-slider.api'
import { SettingsConstant } from '@/components/settings/constant/settings-constant'
import { useRoles } from '@/context/my-server-context'
import { Slider } from '@/modules/slider/slider'
import { Layout } from '@/ui/layout/layout'
import { SectionTitle } from '@/ui/section-title/section-title'
import { Section } from '@/ui/section/section'
import styles from './about-us-section.module.scss'

type Props = {
	title: string
	description: string
}

export const MainPageAboutUs = async ({ title, description }: Props) => {
	const roles = useRoles()
	const mainSliders = await mainSliderApi.findMany({
		isDeleted:
			roles.mainSliderDelete || roles.mainSliderPost || roles.mainSliderPut
				? undefined
				: false,
	})

	return (
		<Section className={styles.main} pTop={false}>
			<Layout>
				<div className={styles.content}>
					<div className={styles.left}>
						<SettingsConstant
							data={{
								type: 'home-page',
								name: 'about-us-title',
								value: title,
							}}
							title='Значение'
							iconClassname={styles.settings}
							type='constant_short'
							theme='dark'
							formTitle='Заголовок'
						>
							<SectionTitle text={title} color='blue' />
						</SettingsConstant>
						<SettingsConstant
							data={{
								type: 'home-page',
								name: 'about-us-description',
								value: description,
							}}
							title='Значение'
							iconClassname={styles.settings}
							type='constant_long'
							theme='dark'
							formTitle='Описание'
						>
							<h4>{description}</h4>
						</SettingsConstant>
					</div>

					<div className={styles.right}>
						<Slider data={mainSliders} />
					</div>
				</div>
			</Layout>
		</Section>
	)
}
