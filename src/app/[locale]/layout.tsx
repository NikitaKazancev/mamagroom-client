// import { Comfortaa, Quicksand, Raleway, Montserrat, Nunito, Poppins } from 'next/font/google'
import { headerNavbarLinkApi } from '@/api/header-navbar-link/header-navbar-link.api'
import { Language } from '@/i18n'
import { AcceptCookiePopUpServer } from '@/modules/accept-cookie-pop-up/accept-cookie-pop-up-server'
import { Footer } from '@/modules/footer/footer'
import { FullTransparentBlock } from '@/modules/full-transparent-block/full-transparent-block'
import { Header } from '@/modules/header/header'
import { SettingsForm } from '@/modules/settings/form/settings-form'
import { fillRoles } from '@/utils/auth/auth'
import { getTranslations } from 'next-intl/server'
import { Raleway } from 'next/font/google'
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

export default async function RootLayout({
	children,
	params,
}: Readonly<{
	children: React.ReactNode
	params: { locale: Language }
}>) {
	await fillRoles()

	const navLinks = await headerNavbarLinkApi.findMany({
		language: params.locale,
		isDeleted: false,
	})
	const t = await getTranslations('General')

	return (
		<html lang={params.locale}>
			<link rel='icon' href='/logos/favicon.png' sizes='any' />
			<body className={inter.className}>
				<FullTransparentBlock />
				<SettingsForm />
				<Header translations={{ book: t('book') }} navLinks={navLinks} />
				<AcceptCookiePopUpServer />
				<Providers>{children}</Providers>
				<Footer />
			</body>
		</html>
	)
}
