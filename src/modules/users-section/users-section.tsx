import { userApi } from '@/api/user/user.api'
import { Layout } from '@/ui/layout/layout'
import { SectionTitle } from '@/ui/section-title/section-title'
import { Section } from '@/ui/section/section'
import { GeneralProps } from '@/utils/types'
import { Table } from '../table/table'
import styles from './users-section.module.scss'

type Props = {
	generalProps: GeneralProps
}

export const UsersSection = async ({ generalProps }: Props) => {
	const users = await userApi.findMany({
		isDeleted:
			generalProps.roles.userDelete ||
			generalProps.roles.userPut ||
			generalProps.roles.userPost
				? undefined
				: false,
	})

	return (
		<Section className={styles.main}>
			<Layout>
				<SectionTitle text='пользователи' color='blue' />
				<Table
					data={users}
					columns={['name', 'email', 'createdAt', 'updatedAt', 'roles']}
					className={styles.table}
					generalProps={generalProps}
				/>
			</Layout>
		</Section>
	)
}
