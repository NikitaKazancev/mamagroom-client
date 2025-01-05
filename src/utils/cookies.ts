'use server'

import Cookies from 'js-cookie'
import { cookies } from 'next/headers'

export const token = async () => {
	return cookies().get('token')?.value || null
}

export const saveToken = async (token: string) => {
	Cookies.set('token', token, {
		domain: process.env.NEXT_PUBLIC_DOMAIN,
		sameSite: 'Lax',
		expires: 7,
		secure: true,
	})
}
