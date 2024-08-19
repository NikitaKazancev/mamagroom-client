import { fileAPI } from '@/api/file/file.api'
import { Language } from '@/i18n'
import { Layout } from '@/ui/layout/layout'
import { Section } from '@/ui/section/section'
import Image from 'next/image'
import styles from './main-section.module.scss'

type Props = {
	language: Language
	title: string
	description: string
}

export const MainMainSection = async ({
	language,
	title,
	description,
}: Props) => {
	return (
		<Section className={styles.main} bg={false} pTop={false} pBottom={false}>
			<Image
				src={fileAPI.findHomePageMainBgDestination()}
				alt='МамагруМ'
				width={1920}
				height={59}
				priority
			/>
			<Layout>
				<div className={styles.headers}>
					<h1>{title}</h1>
					<h2>{description}</h2>
				</div>
			</Layout>
		</Section>
	)
}
