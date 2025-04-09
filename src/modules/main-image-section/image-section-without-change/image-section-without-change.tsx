import { Layout } from '@/ui/layout/layout'
import { Section } from '@/ui/section/section'
import Image from 'next/image'
import styles from '../main-image-section.module.scss'

type Props = {
	title?: string
	fileUrl?: string
}

export const ImageSectionWithoutChange = async ({ title, fileUrl }: Props) => {
	return (
		<Section className={styles.main} bg={false} pTop={false} pBottom={false}>
			<Image
				src={fileUrl ? fileUrl : ''}
				alt='МамагруМ'
				priority
				fill
				sizes='100wv'
			/>
			<Layout>
				<div className={styles.headers}>{title && <h2>{title}</h2>}</div>
			</Layout>
		</Section>
	)
}
