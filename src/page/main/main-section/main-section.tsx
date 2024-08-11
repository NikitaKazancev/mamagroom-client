import { Layout } from '@/ui/layout/layout'
import { Section } from '@/ui/section/section'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import styles from './main-section.module.scss'

export const MainMainSection = () => {
	const t = useTranslations('HomePage')

	return (
		<Section className={styles.main} bg={false} pTop={false} pBottom={false}>
			<Image
				src={'/pages/main/bg-1.jpg'}
				alt='МамагруМ'
				width={1920}
				height={59}
				priority
			/>
			<Layout>
				<div className={styles.headers}>
					<h1>{t('title')}</h1>
					<h2>описание</h2>
				</div>
			</Layout>
		</Section>
	)
}
