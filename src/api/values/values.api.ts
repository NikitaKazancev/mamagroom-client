import { fetchData } from '../instances'
import { Value } from './values.types'

export const valuesUrl = (language: string) => `/values?language=${language}`

class ValueAPI {
	async findMany({ language }: { language: string }): Promise<Value[]> {
		const url = valuesUrl(language)
		// const data = await fetchData(`${SERVER_PATH}${url}`, { key: url })
		const data = await fetchData({ url })

		if (!data) {
			return []
		}

		return data
	}
}

export const valueAPI = new ValueAPI()
