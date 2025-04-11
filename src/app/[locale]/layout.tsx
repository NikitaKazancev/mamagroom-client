import { constantApi } from '@/api/constant/constant.api'
import { headerNavbarLinkApi } from '@/api/header-navbar-link/header-navbar-link.api'
import { LINKS } from '@/constants/links.constants'
import { MyProvider } from '@/context/my-context-provider'
import { getTranslation, useRoles } from '@/context/my-server-context'
import { Language } from '@/i18n/types'
import { AcceptCookiePopUpServer } from '@/modules/accept-cookie-pop-up/accept-cookie-pop-up-server'
import { Footer } from '@/modules/footer/footer'
import { FullTransparentBlock } from '@/modules/full-transparent-block/full-transparent-block'
import { Header } from '@/modules/header/header'
import { Reviews } from '@/modules/reviews/reviews'
import { SettingsForm } from '@/modules/settings/form/settings-form'
import { MyToaster } from '@/ui/toaster/my-toaster'
import { Metadata, Viewport } from 'next'
import { NextIntlClientProvider } from 'next-intl'
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
	const t = await getTranslation({
		namespace: 'Metadata',
		locale: params.locale,
	})
	const constants = await constantApi.findMany({
		language: params.locale as Language,
		type: 'homePage',
	})

	const me = t('me')
	const siteName = t('siteName')
	const title = t('baseTitle')
	const description = constants?.homePage_mainDescription
	const locale = params.locale

	return {
		generator: 'Next.js',
		applicationName: siteName,
		referrer: 'origin-when-cross-origin',
		keywords: t('baseKeywords'),
		authors: {
			name: me,
			url: LINKS.my.telegram,
		},
		creator: me,
		publisher: me,
		title: {
			default: title,
			template: `%s | ${siteName}`,
		},
		description,
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
		alternates: {
			canonical: '.',
			languages: {
				ru: '/ru',
				en: '/en',
				'x-default': '/ru',
			},
		},
		openGraph: {
			title,
			description,
			url: `${LINKS.site.url}/${locale}`,
			type: 'website',
			locale,
			siteName,
			images: {
				url: `${LINKS.site.url}/logos/logo-full-256.png`,
				width: 256,
				height: 256,
				alt: siteName,
			},
			emails: LINKS.foreign.email,
			phoneNumbers: LINKS.foreign.phone,
			alternateLocale: locale === 'ru' ? 'en' : 'ru',
		},
		verification: {
			google: 'H36KGQNSmi2SdKelkImPwdO69JOYLUcSvNfabDWJ9wU',
			yandex: 'adefe41fd50ead4c',
		},
		manifest: '/manifest.json',
		robots: {
			index: true,
			follow: true,
			nocache: false,
			googleBot: {
				index: true,
				follow: true,
				noimageindex: false,
				'max-video-preview': -1,
				'max-image-preview': 'large',
				'max-snippet': -1,
			},
		},
		category: t('category'),
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
	const t = await getTranslation('General')
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
				<script src={LINKS.scripts.dikidi} async />
				<link rel='stylesheet' href='https://cdn.plyr.io/3.7.8/plyr.css' />
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
						<main>
							{children}
							<Reviews />
						</main>
						<Footer />
						{/* <ProcedureSelection /> */}
					</MyProvider>
				</NextIntlClientProvider>
			</body>
			{/* <GoogleAnalytics gaId='G-XYZ' /> */}
		</html>
	)
}
