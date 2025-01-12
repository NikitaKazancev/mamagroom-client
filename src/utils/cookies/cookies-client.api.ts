'use client'

import Cookies from 'js-cookie'
import {
	setCookie as setCookieServer,
	setToken as setTokenServer,
} from './cookies-server.api'

import { COOKIES } from './cookies.general'

export const setCookie = async (
	cookieName: COOKIES,
	value: string,
	expires: number = 365
) => {
	setCookieServer(cookieName, value, expires)

	setTimeout(() => {
		Cookies.set(cookieName, value, {
			domain: process.env.NEXT_PUBLIC_DOMAIN,
			expires,
			sameSite: 'lax',
		})
	}, 1000)
}

export const setToken = async (token: string) => {
	setTokenServer(token)

	setTimeout(() => {
		Cookies.set(COOKIES.token, token, {
			expires: 7,
			sameSite: 'lax',
			secure: true,
		})
	}, 1000)
}

export const removeToken = async () => {
	Cookies.remove(COOKIES.token)
}
