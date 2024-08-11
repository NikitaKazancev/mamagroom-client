import { SITE_NAME } from '@/constants/seo.constants'
import type { Metadata } from 'next'
// import { Comfortaa, Quicksand, Raleway, Montserrat, Nunito, Poppins } from 'next/font/google'
import { useLocale } from 'next-intl'
import { Raleway } from 'next/font/google'
import './globals.scss'
import { Providers } from './provider'
import Link from 'next/link'

const inter = Raleway({
	subsets: ['latin'],
	weight: ['500', '700'],
	display: 'swap',
	style: ['normal'],
})

export const metadata: Metadata = {
	title: {
		default: `${SITE_NAME} - Мы ОБОЖАЕМ свое дело`,
		template: `%s | ${SITE_NAME}`,
	},
	description: 'Любим стричь ваших любимцев',
}

export default function RootLayout({
	children,
	params,
}: Readonly<{
	children: React.ReactNode
	params: { locale: string }
}>) {
	const locale = useLocale()
	if (locale !== params.locale)
		return (
			<div>
				<h2>Not Found</h2>
				<p>Could not find requested resource</p>
				<Link href='/'>Return Home</Link>
			</div>
		)

	return (
		<html lang={params.locale}>
			<link rel='icon' href='/logos/favicon.png' sizes='any' />
			<body className={inter.className}>
				<Providers>{children}</Providers>
			</body>
		</html>
	)
}
