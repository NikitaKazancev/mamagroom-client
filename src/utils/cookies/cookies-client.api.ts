'use client'

import Cookies from 'js-cookie'
import { COOKIES } from './cookies.general'

export const setCookie = async (
	cookieName: COOKIES,
	value: string,
	expires: number = 365
) => {
	Cookies.set(cookieName, value, {
		domain: process.env.NEXT_PUBLIC_DOMAIN,
		expires,
		sameSite: 'lax',
	})
}

export const setToken = async (token: string) => {
	Cookies.set(COOKIES.token, token, {
		expires: 7,
		sameSite: 'lax',
		secure: true,
	})
}

export const removeToken = async () => {
	Cookies.remove(COOKIES.token)
}
