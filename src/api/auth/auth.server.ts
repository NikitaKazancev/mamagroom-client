'use server'

import { removeToken, setToken } from '@/utils/cookies/cookies-server.api'
import { authApi, AuthDto } from './auth.api'

export const login = async (formData: FormData, initialData: AuthDto) => {
	const email = formData.get('email')
	const password = formData.get('password')
	if (!email || !password) return

	const data = await authApi.login({
		email: email.toString(),
		password: password.toString(),
	})

	if (data) {
		setToken(data.token)
		return data.token
	}
}

export const logout = async () => {
	await authApi.logout()
	removeToken()
}
