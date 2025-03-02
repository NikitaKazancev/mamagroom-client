import { Layout } from '@/ui/layout/layout'
import { SectionTitle } from '@/ui/section-title/section-title'
import { Section } from '@/ui/section/section'
import Image from 'next/image'
import styles from './cards.module.scss'

type Props = {
	title: string
	data: {
		id: string
		name: string
		description?: string
		imageName?: string
	}[]
}

export const Cards = ({ data, title }: Props) => {
	return (
		<Section>
			<Layout>
				<SectionTitle text={title} color='blue' />
				<div className={styles.cards}>
					{data.map(item => (
						<div key={item.id} className={styles.card}>
							{item.imageName && (
								<div className={styles.imgWrapper}>
									<Image
										src={item.imageName}
										alt={item.name}
										fill
										className='object-cover'
									/>
								</div>
							)}
							<div className={styles.info}>
								<h3 className={styles.title}>{item.name}</h3>
								<p className={styles.desc}>{item.description}</p>
							</div>
						</div>
					))}
				</div>
			</Layout>
		</Section>
	)
}
