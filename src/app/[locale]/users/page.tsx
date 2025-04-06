import { Language } from '@/i18n/types'
import { UsersSection } from '@/modules/users-section/users-section'
import { Metadata } from 'next'

export async function generateMetadata({
	params,
}: {
	params: { locale: string }
}): Promise<Metadata> {
	return {
		robots: {
			index: false,
			follow: false,
			googleBot: {
				index: false,
				follow: false,
			},
		},
		title: 'Пользователи',
	}
}

export default async function Users({
	params,
}: {
	params: { locale: Language }
}) {
	return <UsersSection />
}
