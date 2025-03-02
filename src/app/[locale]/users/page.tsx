import { Language } from '@/i18n/types'
import { UsersSection } from '@/modules/users-section/users-section'
import { getRoles } from '@/utils/auth/auth'
import { GeneralProps } from '@/utils/types'
import { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'User Management',
	description: 'Manage system users and their roles',
}

export default async function Users({
	params,
}: {
	params: { locale: Language }
}) {
	const roles = await getRoles()
	const generalProps: GeneralProps = { roles, language: params.locale }

	return (
		<>
			<UsersSection />
		</>
	)
}
