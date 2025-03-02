import { userApi } from '@/api/user/user.api'
import { Layout } from '@/ui/layout/layout'
import { SectionTitle } from '@/ui/section-title/section-title'
import { Section } from '@/ui/section/section'
import { Table } from '../table/table'
import styles from './users-section.module.scss'

export const UsersSection = async () => {
	const users = await userApi.findMany({})

	return (
		<Section className={styles.main}>
			<Layout>
				<SectionTitle text='пользователи' color='blue' />
				<Table
					data={users}
					columns={['name', 'email', 'createdAt', 'updatedAt', 'roles']}
					className={styles.table}
				/>
			</Layout>
		</Section>
	)
}
