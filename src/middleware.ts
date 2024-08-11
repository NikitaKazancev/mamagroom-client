import createMiddleware from 'next-intl/middleware'

export default createMiddleware({
	// A list of all locales that are supported
	locales: ['ru', 'en'],

	// Used when no locale matches
	defaultLocale: 'ru',
	localeDetection: false,
})

export const config = {
	matcher: ['/((?!api|_next|static|.*\\..*).*)'],
}
