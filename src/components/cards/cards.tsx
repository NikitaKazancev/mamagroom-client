import { Layout } from '@/ui/layout/layout'
import { SectionTitle } from '@/ui/section-title/section-title'
import { Section } from '@/ui/section/section'
import { GeneralProps } from '@/utils/types'
import Image from 'next/image'
import { SettingsConstant } from '../settings/constant/settings-constant'
import styles from './cards.module.scss'

type Props = {
	generalProps: GeneralProps
	title: string
	data: {
		id: string
		name: string
		description?: string
		imageName?: string
	}[]
}

export const Cards = ({ data, title, generalProps }: Props) => {
	return (
		<Section>
			<Layout>
				<SettingsConstant
					data={{
						language: generalProps.language,
						type: 'home-page',
						name: 'about-us-title',
						value: title,
					}}
					title='Значение'
					iconClassname={styles.settings}
					type='constant_short'
					roles={generalProps.roles}
					theme='dark'
					formTitle='Заголовок секции'
				>
					<SectionTitle text={title} color='blue' />
				</SettingsConstant>
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
										sizes='250px'
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
