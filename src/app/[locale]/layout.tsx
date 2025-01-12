// import { Comfortaa, Quicksand, Raleway, Montserrat, Nunito, Poppins } from 'next/font/google'
import { headerNavbarLinkApi } from '@/api/header-navbar-link/header-navbar-link.api'
import { Language } from '@/i18n'
import { AcceptCookiePopUpServer } from '@/modules/accept-cookie-pop-up/accept-cookie-pop-up-server'
import { Footer } from '@/modules/footer/footer'
import { FullTransparentBlock } from '@/modules/full-transparent-block/full-transparent-block'
import { Header } from '@/modules/header/header'
import { SettingsForm } from '@/modules/settings/form/settings-form'
import { getRoles } from '@/utils/auth/auth'
import { getToken } from '@/utils/cookies/cookies-server.api'
import { GeneralProps } from '@/utils/types'
import { getTranslations } from 'next-intl/server'
import { Raleway } from 'next/font/google'
import './globals.scss'

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
	const t = await getTranslations('General')
	const token = await getToken()
	const roles = await getRoles(token ? token : '')
	const generalProps: GeneralProps = { roles, language: params.locale }

	const navLinks = await headerNavbarLinkApi.findMany({
		language: params.locale,
		isDeleted:
			roles.headerNavbarLinkPost ||
			roles.headerNavbarLinkPut ||
			roles.headerNavbarLinkDelete
				? undefined
				: false,
	})
	return (
		<html lang={params.locale}>
			<link rel='icon' href='/logos/favicon.png' sizes='any' />
			<body className={inter.className}>
				<FullTransparentBlock />
				<Header
					translations={{ book: t('book') }}
					navLinks={navLinks}
					generalProps={generalProps}
				/>
				<SettingsForm />
				<AcceptCookiePopUpServer />
				{children}
				<Footer token={token} />
			</body>
		</html>
	)
}
