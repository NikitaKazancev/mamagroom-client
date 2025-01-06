'use server'

import { cookies } from 'next/headers'
import { COOKIES } from './cookies.general'

export const getCookie = async (cookieName: COOKIES) => {
	return cookies().get(cookieName)?.value
}

export const setCookie = async (
	cookieName: COOKIES,
	value: string,
	expires: number = 365
) => {
	cookies().set(cookieName, value, {
		expires,
		sameSite: 'lax',
	})
}

export const getToken = async () => {
	return cookies().get(COOKIES.token)?.value || null
}

export const setToken = async (token: string) => {
	cookies().set(COOKIES.token, token, {
		expires: 7,
		sameSite: 'lax',
		secure: true,
	})
}
