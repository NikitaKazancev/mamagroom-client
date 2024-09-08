import { fetchData } from '../instances'
import { User } from './user.types'

export const usersUrl = () => `/users`

class UserAPI {
	async findCurrentUserData() {
		const url = `${usersUrl()}/profile`
		const data: User = await fetchData({ url, auth: true })

		return data
	}
}

export const userAPI = new UserAPI()
