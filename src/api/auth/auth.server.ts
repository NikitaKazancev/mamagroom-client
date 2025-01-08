'use server'

import { removeToken, setToken } from '@/utils/cookies/cookies-server.api'
import { objectFromFormData } from '@/utils/functions'
import { authApi } from './auth.api'

export const login = async (formData: FormData) => {
	const data = objectFromFormData(formData)
	if (!data.email || !data.password) return

	const fetchedData = await authApi.login({
		email: data.email.toString(),
		password: data.password.toString(),
	})

	if (fetchedData) {
		setToken(fetchedData.token)
		return fetchedData.token
	}
}

export const logout = async () => {
	await authApi.logout()
	removeToken()
}
