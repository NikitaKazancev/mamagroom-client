import { getLanguage, useRoles } from '@/context/my-server-context'
import { Layout } from '@/ui/layout/layout'
import { Section } from '@/ui/section/section'
import styles from './values.module.scss'
import { valueApi } from '@/api/values/values.api'
import { SettingsConstant } from '@/components/settings/constant/settings-constant'
import { SettingsValueForm } from '@/components/settings/values/values-form'
import { GridList } from '@/modules/grid-list/grid-list'
import { AddItem } from '@/modules/settings/add/add-item'
import { SectionTitle } from '@/ui/section-title/section-title'

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
				<div></div>
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
				<GridList className={styles.list} content={values} />
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
