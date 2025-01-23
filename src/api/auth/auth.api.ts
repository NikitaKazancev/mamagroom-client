import { request } from '../request'
import { Role } from '../user/user.types'

type Auth = {
	name: string
	isDeleted: boolean
	id: string
	createdAt: Date
	updatedAt: Date
	roles: Role[]
	email: string
	password: string
	token: string
}

export type AuthDto = {
	email: string
	password: string
	recaptchaToken?: string
}

class AuthApi {
	url = 'auth'

	async login(auth: AuthDto) {
		const url = `/${this.url}/login`
		const data = (await request({
			url,
			method: 'post',
			body: auth,
			auth: false,
			recaptchaToken: auth.recaptchaToken,
		})) as Auth

		if (data) {
			return data
		}
	}

	async logout() {
		const url = `/${this.url}/logout`
		await request({
			url,
			method: 'post',
			auth: false,
		})
	}
}

export const authApi = new AuthApi()
