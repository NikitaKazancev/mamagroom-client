import { valueApi } from '@/api/values/values.api'
import { Language } from '@/i18n'
import { GridList } from '@/modules/grid-list/grid-list'
import { Layout } from '@/ui/layout/layout'
import { SectionTitle } from '@/ui/section-title/section-title'
import { Section } from '@/ui/section/section'
import styles from './values.module.scss'

type Props = {
	language: Language
	title: string
}

export const MainPageValues = async ({ language, title }: Props) => {
	const values = await valueApi.findMany({ language, isDeleted: false })

	return (
		<Section className={styles.main}>
			<Layout>
				<SectionTitle text={title} color='blue' />
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
