// import { Comfortaa, Quicksand, Raleway, Montserrat, Nunito, Poppins } from 'next/font/google'
import { FullTransparentBlock } from '@/components/full-transparent-block/full-transparent-block'
import { AcceptCookiePopUpServer } from '@/modules/accept-cookie-pop-up/accept-cookie-pop-up-server'
import { getTranslations } from 'next-intl/server'
import { Raleway } from 'next/font/google'
import { cookies } from 'next/headers'
import './globals.scss'
import { Providers } from './provider'

const inter = Raleway({
	subsets: ['latin'],
	weight: ['500', '700'],
	display: 'swap',
	style: ['normal'],
})

export async function generateMetadata({
	params,
}: {
	params: { locale: string }
}) {
	const t = await getTranslations({
		namespace: 'General',
		locale: params.locale,
	})

	return {
		title: {
			default: t('metadataTitle'),
			template: `%s | ${t('siteName')}`,
		},
		description: t('metadataDescription'),
	}
}

export default function RootLayout({
	children,
	params,
}: Readonly<{
	children: React.ReactNode
	params: { locale: string }
}>) {
	const cookieStore = cookies()

	return (
		<html lang={params.locale}>
			<link rel='icon' href='/logos/favicon.png' sizes='any' />
			<body className={inter.className}>
				<FullTransparentBlock />
				<AcceptCookiePopUpServer cookies={cookieStore} />
				<Providers>{children}</Providers>
			</body>
		</html>
	)
}
