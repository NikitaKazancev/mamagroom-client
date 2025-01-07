import { valueApi } from '@/api/values/values.api'
import { SettingsConstant } from '@/components/settings/constant/settings-constant'
import { GridList } from '@/modules/grid-list/grid-list'
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
		isDeleted: false,
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
				>
					<SectionTitle text={title} color='blue' />
				</SettingsConstant>
				<GridList
					className={styles.list}
					content={values.map((value, i) => ({
						title: value.title,
						description: value.description,
						imageSrc: value.imageName,
					}))}
				/>
			</Layout>
		</Section>
	)
}
