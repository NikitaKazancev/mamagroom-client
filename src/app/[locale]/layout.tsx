// import { Comfortaa, Quicksand, Raleway, Montserrat, Nunito, Poppins } from 'next/font/google'
import { constantApi } from '@/api/constant/constant.api'
import { headerNavbarLinkApi } from '@/api/header-navbar-link/header-navbar-link.api'
import { Language } from '@/i18n/types'
import { AcceptCookiePopUpServer } from '@/modules/accept-cookie-pop-up/accept-cookie-pop-up-server'
import { Footer } from '@/modules/footer/footer'
import { FullTransparentBlock } from '@/modules/full-transparent-block/full-transparent-block'
import { Header } from '@/modules/header/header'
import { SettingsForm } from '@/modules/settings/form/settings-form'
import { WorkingMessage } from '@/temp/working-message/working-message'
import { MyToaster } from '@/ui/toaster/my-toaster'
import { getRoles } from '@/utils/auth/auth'
import { getToken } from '@/utils/cookies/cookies-server.api'
import { GeneralProps } from '@/utils/types'
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
			<body className={inter.className}>
				<NextIntlClientProvider>
					<MyToaster />
					{process.env.NODE_ENV === 'production' && <WorkingMessage />}
					<AcceptCookiePopUpServer />
					<FullTransparentBlock />
					<Header
						translations={{ book: t('book') }}
						navLinks={navLinks}
						generalProps={generalProps}
					/>
					<SettingsForm />
					<main>{children}</main>
					<Footer token={token} />
				</NextIntlClientProvider>
			</body>
		</html>
	)
}
