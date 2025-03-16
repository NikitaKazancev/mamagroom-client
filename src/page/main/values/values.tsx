import { valueApi } from '@/api/values/values.api'
import { SettingsConstant } from '@/components/settings/constant/settings-constant'
import { SettingsValueForm } from '@/components/settings/values/values-form'
import { GridList } from '@/modules/grid-list/grid-list'
import { AddItem } from '@/modules/settings/add/add-item'
import { Layout } from '@/ui/layout/layout'
import { SectionTitle } from '@/ui/section-title/section-title'
import { Section } from '@/ui/section/section'
import { GeneralProps } from '@/utils/types'
import styles from './values.module.scss'

type Props = {
	generalProps: GeneralProps
	title: string
}

export const MainPageValues = async ({ generalProps, title }: Props) => {
	const values = await valueApi.findMany({
		language: generalProps.language,
		isDeleted:
			generalProps.roles.headerNavbarLinkPost ||
			generalProps.roles.headerNavbarLinkPut ||
			generalProps.roles.headerNavbarLinkDelete
				? undefined
				: false,
	})

	return (
		<Section className={styles.main}>
			<Layout>
				<SettingsConstant
					data={{
						language: generalProps.language,
						type: 'home-page',
						name: 'values-title',
						value: title,
					}}
					title='Заголовок секции'
					iconClassname={styles.settings}
					type='constant_short'
					roles={generalProps.roles}
					theme='dark'
				>
					<SectionTitle text={title} color='blue' />
				</SettingsConstant>
				<GridList
					generalProps={generalProps}
					className={styles.list}
					content={values}
				/>
				<AddItem
					data={{
						id: '',
						language: generalProps.language,
						title: '',
						description: '',
					}}
					type='value'
					Component={SettingsValueForm}
					className={styles.addItem}
					postRole={generalProps.roles.valuePost}
				/>
			</Layout>
		</Section>
	)
}
