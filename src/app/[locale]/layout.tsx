import { constantApi } from '@/api/constant/constant.api'
import { headerNavbarLinkApi } from '@/api/header-navbar-link/header-navbar-link.api'
import { MyProvider } from '@/context/my-context-provider'
import { useRoles } from '@/context/my-server-context'
import { Language } from '@/i18n/types'
import { AcceptCookiePopUpServer } from '@/modules/accept-cookie-pop-up/accept-cookie-pop-up-server'
import { Footer } from '@/modules/footer/footer'
import { FullTransparentBlock } from '@/modules/full-transparent-block/full-transparent-block'
import { Header } from '@/modules/header/header'
import { ProcedureSelection } from '@/modules/procedure-selection/procedure-selection'
import { SettingsForm } from '@/modules/settings/form/settings-form'
import { MyToaster } from '@/ui/toaster/my-toaster'
import { Metadata } from 'next'
import { NextIntlClientProvider } from 'next-intl'
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
}): Promise<Metadata> {
	const t = await getTranslations({
		namespace: 'Metadata',
		locale: params.locale,
	})
	const constants = await constantApi.findMany({
		language: params.locale as Language,
		type: 'homePage',
	})

	return {
		title: {
			default: t('baseTitle'),
			template: `%s | ${t('siteName')}`,
		},
		description: constants?.homePage_mainDescription,
		verification: {
			google: 'H36KGQNSmi2SdKelkImPwdO69JOYLUcSvNfabDWJ9wU',
			yandex: 'adefe41fd50ead4c',
		},
		robots: {
			index: false,
			follow: false,
			googleBot: {
				index: false,
				follow: false,
			},
		},
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
	const roles = useRoles()

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
			<head>
				<link rel='icon' href='/logos/favicon.png' sizes='any' />
				<link
					rel='preload'
					href='/logos/logo-row-dark.png'
					as='image'
					fetchPriority='high'
				/>
				<link
					rel='preload'
					href='/logos/logo-row-light.png'
					as='image'
					fetchPriority='high'
				/>
				<script
					type='text/javascript'
					src='https://dikidi.ru/assets/js/widget_record/widget2.min.js'
				></script>
			</head>
			<body className={inter.className}>
				<NextIntlClientProvider>
					<MyProvider roles={roles} language={params.locale}>
						<MyToaster />
						<AcceptCookiePopUpServer />
						<FullTransparentBlock />
						<Header
							translations={{ book: t('book') }}
							navLinks={navLinks}
						/>
						<SettingsForm />
						<main>{children}</main>
						<Footer />
						<ProcedureSelection />
					</MyProvider>
				</NextIntlClientProvider>
			</body>
		</html>
	)
}
