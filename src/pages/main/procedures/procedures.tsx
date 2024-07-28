import { BarChangerSlider } from '@/modules/bar-changer-slider/bar-changer-slider'
import { Layout } from '@/ui/layout/layout'
import { SectionTitle } from '@/ui/section-title/section-title'
import { Section } from '@/ui/section/section'
import styles from './procedures.module.scss'

export const MainProcedures = () => {
	return (
		<Section className={styles.main}>
			<Layout className={styles.layout}>
				<div className={styles.left}>
					<BarChangerSlider className={styles.slider} />
				</div>
				<div className={styles.right}>
					<SectionTitle text='процедуры' color='blue' />
				</div>
			</Layout>
		</Section>
	)
}
