import { valueApi } from '@/api/values/values.api'
import { InsideCards } from '@/components/inside-cards/inside-cards'
import { SettingsConstant } from '@/components/settings/constant/settings-constant'
import { SettingsValueForm } from '@/components/settings/values/values-form'
import { getLanguage, useRoles } from '@/context/my-server-context'
import { GridList } from '@/modules/grid-list/grid-list'
import { AddItem } from '@/modules/settings/add/add-item'
import { Layout } from '@/ui/layout/layout'
import { SectionTitle } from '@/ui/section-title/section-title'
import { Section } from '@/ui/section/section'
import styles from './values.module.scss'

type Props = {
	title: string
}

export const MainPageValues = async ({ title }: Props) => {
	const roles = useRoles()
	const language = await getLanguage()
	const values = await valueApi.findMany({
		language: language,
		isDeleted:
			roles.valuePost || roles.valuePut || roles.valueDelete
				? undefined
				: false,
	})

	return (
		<Section className={styles.main}>
			<Layout>
				<SettingsConstant
					data={{
						type: 'home-page',
						name: 'values-title',
						value: title,
					}}
					title='Значение'
					iconClassname={styles.settings}
					type='constant_short'
					theme='dark'
					formTitle='Заголовок'
				>
					<SectionTitle text={title} color='blue' />
				</SettingsConstant>
				<GridList className={styles.gridList} content={values} />
				<InsideCards data={values} className={styles.insideCards} />
				<AddItem
					data={{
						id: '',
						title: '',
						description: '',
					}}
					type='value'
					Component={SettingsValueForm}
					className={styles.addItem}
					formTitle='Добавление ценности'
				/>
			</Layout>
		</Section>
	)
}
