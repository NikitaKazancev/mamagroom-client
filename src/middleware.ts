import { jwtVerify } from 'jose'
import createIntlMiddleware from 'next-intl/middleware'
import { NextRequest } from 'next/server'
import { routing } from './i18n/routing'
import { COOKIES } from './utils/cookies/cookies.general'

const intlMiddleware = createIntlMiddleware(routing)

export async function middleware(request: NextRequest) {
	const response = intlMiddleware(request)
	const token = request.cookies.get(COOKIES.token)?.value
	if (!token) return response

	try {
		const { payload } = await jwtVerify(
			token,
			new TextEncoder().encode(process.env.JWT_SECRET)
		)

		const roles = Array.isArray(payload.roles) ? payload.roles : []
		response.headers.set('x-user-roles', JSON.stringify(roles))
	} catch (error) {}

	return response
}

export const config = {
	matcher: ['/((?!api|_next|static|.*\\..*).*)'],
}
