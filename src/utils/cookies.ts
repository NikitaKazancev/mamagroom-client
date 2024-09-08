'use server'

import Cookies from 'js-cookie'
import { cookies } from 'next/headers'

enum EnumTokens {
	'ACCESS_TOKEN' = 'accessToken',
	'REFRESH_TOKEN' = 'refreshToken',
}

export const getAccessToken = async () => {
	const accessToken = cookies().get(EnumTokens.ACCESS_TOKEN)?.value
	return accessToken || null
}

export const saveAccessToken = async (accessToken: string) => {
	Cookies.set(EnumTokens.ACCESS_TOKEN, accessToken, {
		domain: 'localhost',
		sameSite: 'strict',
		expires: 1,
	})
}
