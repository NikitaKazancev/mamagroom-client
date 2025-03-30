import { AuthRedirect } from '@/modules/auth/auth-redirect/auth-redirect'
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
		title: 'Авторизация',
	}
}

export default function AuthRedirectPage() {
	return <AuthRedirect />
}
