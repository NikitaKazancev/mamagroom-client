'use server'

import { removeToken, setToken } from '@/utils/cookies/cookies-server.api'
import { objectFromFormData } from '@/utils/functions'
import { authApi } from './auth.api'

export const login = async (formData: FormData) => {
	const data = objectFromFormData(formData)

	const fetchedData = await authApi.login({
		email: data.email.toString(),
		password: data.password.toString(),
		recaptchaToken: data['g-recaptcha-response']
			? data['g-recaptcha-response'].toString()
			: undefined,
	})

	if (fetchedData) {
		setToken(fetchedData.token)
		return fetchedData.token
	}

	return undefined
}

export const logout = async () => {
	await authApi.logout()
	removeToken()
}
