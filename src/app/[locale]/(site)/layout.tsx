import { constantApi } from '@/api/constant/constant.api'
import { headerNavbarLinkApi } from '@/api/header-navbar-link/header-navbar-link.api'
import { reviewApi } from '@/api/review/review.api'
import { YandexMetrika } from '@/components/yandex/metrics/yandex-metrics'
import { LINKS } from '@/constants/links.constants'
import { MyProvider } from '@/context/my-context-provider'
import { useRoles } from '@/context/my-server-context'
import { Language } from '@/i18n/types'
import { AcceptCookiePopUpServer } from '@/modules/accept-cookie-pop-up/accept-cookie-pop-up-server'
import { Footer } from '@/modules/footer/footer'
import { FullTransparentBlock } from '@/modules/full-transparent-block/full-transparent-block'
import { Header } from '@/modules/header/header'
import { Reviews } from '@/modules/reviews/reviews'
import { SettingsForm } from '@/modules/settings/form/settings-form'
import { WorkingMessage } from '@/temp/working-message/working-message'
import { MyToaster } from '@/ui/toaster/my-toaster'
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
			icon: [
				{
					url: '/logos/logo-32.png',
					sizes: '32x32',
					type: 'image/png',
				},
				{
					url: '/logos/logo-192.png',
					sizes: '192x192',
					type: 'image/png',
				},
				{
					url: '/logos/logo-full-256.png',
					sizes: '256x256',
					type: 'image/png',
				},
				{
					url: '/logos/logo-full-512.png',
					sizes: '512x512',
					type: 'image/png',
				},
			],
			apple: '/logos/logo-180.png',
		},
		metadataBase: new URL(LINKS.site.url),
		alternates: {
			canonical: '/ru',
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
	const tMetadata = await getTranslations({
		namespace: 'Metadata',
		locale: params.locale,
	})
	const constants = await constantApi.findMany({
		language: params.locale as Language,
		type: 'homePage',
	})
	const reviewsConstants = await constantApi.findMany({
		language: params.locale as Language,
		type: 'reviews',
	})
	const reviews = await reviewApi.findMany()

	const schemas = [
		{
			'@context': 'https://schema.org',
			'@type': 'LocalBusiness',
			name: tMetadata('siteName'),
			image: `${LINKS.site.url}/logos/logo-full-256.png`,
			description: constants.homePage_mainDescription,
			url: `${LINKS.site.url}/${params.locale}`,
			telephone: LINKS.foreign.phone,
			address: {
				'@type': 'PostalAddress',
				streetAddress: tMetadata('streetAddress'),
				addressLocality: tMetadata('addressLocality'),
				addressRegion: 'Московская область',
				postalCode: '141018',
				addressCountry: 'RU',
				telephone: LINKS.foreign.phone,
			},
			openingHours: 'Tu-Su 10:00-21:00',
			openingHoursSpecification: {
				'@type': 'OpeningHoursSpecification',
				opens: '10:00',
				closes: '21:00',
				dayOfWeek: [
					'Tuesday',
					'Wednesday',
					'Thursday',
					'Friday',
					'Saturday',
					'Sunday',
				],
			},
			geo: {
				'@type': 'GeoCoordinates',
				latitude: '55.9016',
				longitude: '37.7249',
			},
			sameAs: [LINKS.foreign.telegram, LINKS.foreign.whatsapp],
			aggregateRating: {
				'@type': 'AggregateRating',
				ratingValue: reviewsConstants.reviews_rating,
				reviewCount: reviewsConstants.reviews_amount,
				ratingCount: reviewsConstants.reviews_amount,
			},
		},
		{
			'@context': 'https://schema.org',
			'@type': 'WebSite',
			name: tMetadata('siteName'),
			url: LINKS.site.url + params.locale,
		},
		{
			'@context': 'https://schema.org',
			'@type': 'WPHeader',
			name: tMetadata('headerName'),
			description: tMetadata('headerDescription'),
			url: `${LINKS.site.url}/${params.locale}#header`,
		},
		{
			'@context': 'https://schema.org',
			'@type': 'WebPageElement',
			name: constants.reviews_title,
			description: tMetadata('reviewsDescription'),
			url: `${LINKS.site.url}/${params.locale}#reviews`,
		},
		{
			'@context': 'https://schema.org',
			'@type': 'AggregateRating',
			ratingValue: reviewsConstants.reviews_rating,
			ratingCount: reviewsConstants.reviews_amount,
			itemReviewed: {
				'@type': 'Organization',
				name: tMetadata('siteName'),
				logo: `${LINKS.site.url}/logos/logo-full-256.png`,
				url: LINKS.site.url,
			},
		},
		{
			'@context': 'https://schema.org',
			'@type': 'WPFooter',
			name: tMetadata('footerName'),
			description: tMetadata('footerDescription'),
			url: `${LINKS.site.url}/${params.locale}#footer`,
		},
	] as any[]
	reviews.forEach(review => {
		schemas.push({
			'@context': 'https://schema.org',
			'@type': 'Review',
			author: { '@type': 'Person', name: review.name },
			datePublished: review.date,
			reviewRating: {
				'@type': 'Rating',
				ratingValue: review.rating.toString(),
			},
			reviewBody: review.description,
			itemReviewed: {
				'@type': 'Organization',
				name: tMetadata('siteName'),
				logo: `${LINKS.site.url}/logos/logo-full-256.png`,
				url: LINKS.site.url,
			},
		})
	})

	return (
		<html lang={params.locale}>
			<head>
				<link rel='stylesheet' href={LINKS.scripts.plyrCss} />
				<YandexMetrika />
			</head>
			<body className={inter.className}>
				<NextIntlClientProvider>
					<MyProvider roles={roles} language={params.locale}>
						<MyToaster />
						{process.env.NODE_ENV === 'production' && <WorkingMessage />}
						<AcceptCookiePopUpServer />
						<FullTransparentBlock />

						{schemas.map((schema, index) => (
							<script
								key={index}
								type='application/ld+json'
								suppressHydrationWarning
								dangerouslySetInnerHTML={{
									__html: JSON.stringify(schema),
								}}
							/>
						))}

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
					</MyProvider>
				</NextIntlClientProvider>
			</body>
		</html>
	)
}
