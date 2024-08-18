import { constantAPI } from '@/api/constant/constant.api'
import { Language } from '@/i18n'
import { Layout } from '@/ui/layout/layout'
import { Section } from '@/ui/section/section'
import Image from 'next/image'
import styles from './main-section.module.scss'

export const MainMainSection = async ({ language }: { language: Language }) => {
	const mainTitleData = await constantAPI.findMainTitle({
		language,
	})

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
					<h1>{mainTitleData.title}</h1>
					<h2>{mainTitleData.description}</h2>
				</div>
			</Layout>
		</Section>
	)
}
