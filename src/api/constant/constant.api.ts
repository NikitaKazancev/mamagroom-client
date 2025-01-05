import { Language } from '@/i18n'
import { request } from '../request'
import { Constant, ConstantDto } from './constant.types'

class ConstantApi {
	url = 'constants'

	async findMany(queryParams: {
		language?: Language
		type?: string
		name?: string
	}) {
		const url = `/${this.url}?${this.queryParams(queryParams)}`
		const data = await request({ url })

		if (data) {
			return data as Constant[]
		}

		return []
	}

	async put(constant: ConstantDto) {
		const url = `/${this.url}`
		const data = await request({ url, method: 'put', body: constant })

		if (data) {
			return data as Constant
		}
	}

	async delete(queryParams: {
		language?: Language
		type?: string
		name?: string
	}) {
		const url = `/${this.url}?${this.queryParams(queryParams)}`
		const data = await request({ url, method: 'delete' })

		if (data) {
			return data as Constant
		}
	}

	private queryParams({
		language,
		type,
		name,
	}: {
		language?: Language
		type?: string
		name?: string
	}) {
		const queryParams = new URLSearchParams()
		if (language !== undefined) queryParams.append('language', language)
		if (type !== undefined) queryParams.append('type', type)
		if (name !== undefined) queryParams.append('name', name)

		return queryParams.toString()
	}
}

export const constantApi = new ConstantApi()
