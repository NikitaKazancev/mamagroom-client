import { SITE_NAME } from '@/constants/seo.constants'
import type { Metadata } from 'next'
// import { Comfortaa, Quicksand, Raleway, Montserrat, Nunito, Poppins } from 'next/font/google'
import { Raleway } from 'next/font/google'
import './globals.scss'
import { Providers } from './provider'

const inter = Raleway({
	subsets: ['latin'],
	weight: ['500'],
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
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='en'>
			<link rel='icon' href='/logos/favicon.png' sizes='any' />
			<body className={inter.className}>
				<Providers>{children}</Providers>
			</body>
		</html>
	)
}
