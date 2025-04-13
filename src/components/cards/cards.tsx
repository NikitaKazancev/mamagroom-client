import { MasterDto } from '@/api/master/master.api'
import { AddItem } from '@/modules/settings/add/add-item'
import { Layout } from '@/ui/layout/layout'
import { SectionTitle } from '@/ui/section-title/section-title'
import { Section } from '@/ui/section/section'
import Image from 'next/image'
import { SettingsConstant } from '../settings/constant/settings-constant'
import { SettingsMasterForm } from '../settings/master/master-form'
import { SettingsMaster } from '../settings/master/master-link'
import styles from './cards.module.scss'

type Props = {
	title: string
	data: MasterDto[]
}

export const Cards = ({ data, title }: Props) => {
	return (
		<Section id='masters'>
			<Layout>
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
					formTitle='Заголовок секции'
				>
					<SectionTitle text={title} color='blue' />
				</SettingsConstant>
				<ul className={styles.cards}>
					{data.map(item => (
						<li key={item.id} className={styles.card}>
							<SettingsMaster
								data={{ ...item }}
								iconClassname={styles.settings}
								theme='dark'
								formTitle='Изменение мастера'
							/>
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
							<h4 className={styles.title}>{item.name}</h4>
							<h5 className={styles.position}>{item.position}</h5>
							<div className={styles.line}></div>
							<p className={styles.desc}>{item.description}</p>
						</li>
					))}
				</ul>
				<AddItem
					data={{
						id: '',
						name: '',
						position: '',
						description: '',
					}}
					type='master'
					Component={SettingsMasterForm}
					className={styles.addItem}
					formTitle='Добавление мастера'
				/>
			</Layout>
		</Section>
	)
}
