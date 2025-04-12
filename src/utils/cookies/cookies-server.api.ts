'use server'

import { cookies } from 'next/headers'
import { COOKIES } from './cookies.general'

export const getCookie = async (cookieName: COOKIES) => {
	return cookies().get(cookieName)?.value
}

export const getToken = async () => {
	const cookie = cookies()

	if (!cookie.has(COOKIES.token)) return undefined
	return cookie.get(COOKIES.token)?.value || undefined
}

export const removeToken = async () => {
	cookies().delete(COOKIES.token)
}
