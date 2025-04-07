import { constantApi } from '@/api/constant/constant.api'
import { headerNavbarLinkApi } from '@/api/header-navbar-link/header-navbar-link.api'
import { LINKS } from '@/constants/links.constants'
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
import { GoogleAnalytics, GoogleTagManager } from '@next/third-parties/google'
import { Metadata, Viewport } from 'next'
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
		applicationName: t('siteName'),
		icons: {
			icon: '/logos/logo-256.png',
			shortcut: '/logos/logo-256.png',
			apple: '/logos/logo-256.png',
			other: {
				rel: 'touch-icons',
				url: '/logos/logo-256.png',
				sizes: '256х256',
				type: 'image/png',
			},
		},
		metadataBase: new URL(LINKS.site.url),
		openGraph: {
			type: 'website',
			locale: params.locale,
			siteName: t('siteName'),
			images: {
				url: '/logos/logo-full-256.png',
				width: 256,
				height: 256,
				alt: t('siteName'),
			},
			emails: LINKS.foreign.email,
			phoneNumbers: LINKS.foreign.phone,
			alternateLocale: params.locale === 'ru' ? 'en' : 'ru',
		},
		verification: {
			google: 'H36KGQNSmi2SdKelkImPwdO69JOYLUcSvNfabDWJ9wU',
			yandex: 'adefe41fd50ead4c',
		},
		alternates: {
			canonical: LINKS.site.url,
			languages: {
				ru: LINKS.site.url + '/ru',
				en: LINKS.site.url + '/en',
			},
		},
		manifest: '/manifest.json',
		publisher: t('siteName'),
		authors: {
			name: t('siteName'),
			url: LINKS.site.url,
		},
	}
}

export const viewport: Viewport = {
	themeColor: '#0987A0',
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
				<script src={LINKS.dikidi.widgetJs} async />
			</head>
			<GoogleTagManager gtmId='GTM-XYZ' />
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
			<GoogleAnalytics gaId='G-XYZ' />
		</html>
	)
}
