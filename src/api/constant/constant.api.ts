import { fetchData } from '../instances'

export const mainTitleUrl = (language: string, type: string) =>
	`/constants?language=${language}&type=${type}`

class ConstantAPI {
	async findByType({ language, type }: { language: string; type: string }) {
		const url = mainTitleUrl(language, type)
		// const data = await fetchData(`${SERVER_PATH}${url}`, { key: url })
		const data = await fetchData({ url })

		if (!data) {
			return {
				title: '',
				description: '',
			}
		}

		return data
	}
}

export const constantAPI = new ConstantAPI()
