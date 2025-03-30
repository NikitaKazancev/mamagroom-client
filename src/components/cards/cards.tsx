import { MasterDto } from '@/api/master/master.api'
import { AddItem } from '@/modules/settings/add/add-item'
import { Layout } from '@/ui/layout/layout'
import { SectionTitle } from '@/ui/section-title/section-title'
import { Section } from '@/ui/section/section'
import { GeneralProps } from '@/utils/types'
import Image from 'next/image'
import { SettingsConstant } from '../settings/constant/settings-constant'
import { SettingsMasterForm } from '../settings/master/master-form'
import { SettingsMaster } from '../settings/master/master-link'
import styles from './cards.module.scss'

type Props = {
	generalProps: GeneralProps
	title: string
	data: MasterDto[]
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
				<ul className={styles.cards}>
					{data.map(item => (
						<li key={item.id} className={styles.card}>
							<SettingsMaster
								data={{ ...item }}
								roles={generalProps.roles}
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
							<h3 className={styles.title}>{item.name}</h3>
							<h4 className={styles.position}>{item.position}</h4>
							<div className={styles.line}></div>
							<p className={styles.desc}>{item.description}</p>
						</li>
					))}
				</ul>
				<AddItem
					data={{
						id: '',
						language: generalProps.language,
						name: '',
						position: '',
						description: '',
					}}
					type='master'
					Component={SettingsMasterForm}
					className={styles.addItem}
					postRole={generalProps.roles.masterPost}
					formTitle='Добавление мастера'
				/>
			</Layout>
		</Section>
	)
}
