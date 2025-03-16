import { Language } from '@/i18n/types'
import ProceduresById from '@/modules/procedures/procedures-by-id'
import { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'User Management',
	description: 'Manage system users and their roles',
}

export default async function Cats({
	params,
}: {
	params: { locale: Language; id: string }
}) {
	return <ProceduresById locale={params.locale} id={params.id} type='cats' />
}
