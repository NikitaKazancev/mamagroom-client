import { SERVER_PATH } from '../axios-instances'
import { fetchData } from '../instances'
import { Value } from './values.types'

export const valuesUrl = (language: string) => `/values?language=${language}`

class ValueAPI {
	async findMany({ language }: { language: string }) {
		const url = valuesUrl(language)
		// const data = await fetchData(`${SERVER_PATH}${url}`, { key: url })
		const data: Value[] = await fetchData({ url })

		if (!data) {
			return []
		}

		data.forEach((value, i) => {
			value.imageSrc = `${SERVER_PATH}${value.imageName}`
		})

		return data
	}
}

export const valueAPI = new ValueAPI()
