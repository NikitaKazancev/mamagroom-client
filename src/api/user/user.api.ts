import { basicQueryParams, request } from '../request'
import { User, UserDto } from './user.types'

class UserApi {
	url = 'users'

	async findMany(queryParams: { isDeleted?: boolean }) {
		const url = `/${this.url}?${basicQueryParams(queryParams)}`
		const data = await request({ url })

		if (data) {
			return data as User[]
		}

		return []
	}

	async findById(id: string) {
		const url = `/${this.url}/${id}`
		const data = await request({ url })

		if (data) {
			return data as User
		}
	}

	async post(user: UserDto) {
		const url = `/${this.url}`
		const data = await request({ url, method: 'post', body: user })

		if (data) {
			return data as User
		}
	}

	async put(id: string, user: UserDto) {
		const url = `/${this.url}/${id}`
		const data = await request({ url, method: 'put', body: user })

		if (data) {
			return data as User
		}
	}

	async delete(id: string) {
		const url = `/${this.url}/${id}`
		const data = await request({ url, method: 'delete' })

		if (data) {
			return data as User
		}
	}
}

export const userApi = new UserApi()
