import { basicQueryParams, request } from '../request'
import { User, UserDto } from './user.types'

class UserApi {
	url = 'users'
	ttl = 60

	async findMany(queryParams: { isDeleted?: boolean }) {
		const url = `/${this.url}?${basicQueryParams(queryParams)}`
		const data = (await request({
			url,
			revalidateTag: 'users',
			auth: true,
			ttl: this.ttl,
		})) as User[]

		if (data) {
			return data
		}

		return []
	}

	async findById(id: string) {
		const url = `/${this.url}/${id}`
		const data = (await request({ url, auth: true, ttl: this.ttl })) as User

		if (data) {
			return data
		}
	}

	async post(user: UserDto) {
		const url = `/${this.url}`
		const data = (await request({ url, method: 'post', body: user })) as User

		if (data) {
			return data
		}
	}

	async put(id: string, user: UserDto) {
		const url = `/${this.url}/${id}`
		const data = (await request({ url, method: 'put', body: user })) as User

		if (data) {
			return data
		}
	}

	async delete(id: string) {
		const url = `/${this.url}/${id}`
		const data = (await request({ url, method: 'delete' })) as User

		if (data) {
			return data
		}
	}
}

export const userApi = new UserApi()
