import { Language } from '@/i18n'
import { basicQueryParams, fullImageName, request } from '../request'

type Value = {
	language: string
	isDeleted: boolean
	id: string
	imageName: string
	createdAt: Date
	description: string
	updatedAt: Date
	order: number
	title: string
}

type ValueDto = {
	language: Language
	title: string
	description: string
	imageName?: string
	order?: number
	isDeleted?: boolean
	file?: any
}

class ValueApi {
	url = 'values'

	async findMany(queryParams: { language?: Language; isDeleted?: boolean }) {
		const url = `/${this.url}?${basicQueryParams(queryParams)}`
		let data = (await request({ url })) as Value[]

		if (data) {
			data.forEach(value => {
				value.imageName = fullImageName(value.imageName)
			})
			return data
		}

		return []
	}

	async findById(id: string) {
		const url = `/${this.url}/${id}`
		const data = (await request({ url })) as Value

		if (data) {
			data.imageName = fullImageName(data.imageName)
			return data
		}
	}

	async post(value: ValueDto) {
		const url = `/${this.url}`
		const data = (await request({
			url,
			method: 'post',
			body: value,
		})) as Value

		if (data) {
			data.imageName = fullImageName(data.imageName)
			return data
		}
	}

	async put(id: string, value: ValueDto) {
		const url = `/${this.url}/${id}`
		const data = (await request({ url, method: 'put', body: value })) as Value

		if (data) {
			data.imageName = fullImageName(data.imageName)
			return data
		}
	}

	async delete(id: string) {
		const url = `/${this.url}/${id}`
		const data = (await request({ url, method: 'delete' })) as Value

		if (data) {
			data.imageName = fullImageName(data.imageName)
			return data
		}
	}
}

export const valueApi = new ValueApi()
