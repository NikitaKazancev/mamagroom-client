import { userApi } from '@/api/user/user.api'
import { Language } from '@/i18n/types'
import { getRoles } from '@/utils/auth/auth'
import { GeneralProps } from '@/utils/types'
import { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'User Management',
	description: 'Manage system users and their roles',
}

// Client component for user table with search and filtering
import UserTableClient from './user-table-client'

export default async function Users({
	params,
}: {
	params: { locale: Language }
}) {
	const roles = await getRoles()
	const generalProps: GeneralProps = { roles, language: params.locale }

	const users = await userApi.findMany({})

	return (
		<div className='container px-4 py-8 mx-auto'>
			<div className='mb-8'>
				<h1 className='text-3xl font-bold text-gray-900 mb-2'>
					User Management
				</h1>
				<p className='text-gray-500'>
					View and manage system users and their roles
				</p>
			</div>

			<div className='bg-white rounded-lg shadow-md overflow-hidden'>
				<UserTableClient initialUsers={users} />
			</div>
		</div>
	)
}
