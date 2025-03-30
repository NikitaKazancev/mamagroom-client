import { Button } from '@/ui/button/button'
import { Layout } from '@/ui/layout/layout'
import { Section } from '@/ui/section/section'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import styles from './feed.module.scss'

type Props = {
	data: {
		id: string
		name: string
		description?: string
		imageName?: string
	}[]
}

export const Feed = ({ data }: Props) => {
	const t = useTranslations('Vacancies')

	return (
		<Section>
			<Layout>
				<div className={styles.main}>
					{data.map(item => (
						<div key={item.id} className={styles.item}>
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
								<Button text={t('linkText')} theme='dark' />
							</div>
						</div>
					))}
				</div>
			</Layout>
		</Section>
	)
}
