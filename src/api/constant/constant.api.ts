import { Language } from '@/i18n'
import { kebabToCamel } from '@/utils/functions'
import { request } from '../request'
import {
	Constant,
	CONSTANT_NAMES,
	CONSTANT_TYPES,
	ConstantDto,
	ConstantName,
	ConstantType,
	FullConstantName,
} from './constant.types'

class ConstantApi {
	url = 'constants'

	async findMany(queryParams: {
		language?: Language
		type?: ConstantType
		name?: ConstantName
	}) {
		const url = `/${this.url}?${this.queryParams(queryParams)}`
		const data = (await request({
			url,
			revalidateTag: 'constants',
		})) as Constant[]

		if (!data) {
			return undefined
		}

		// @ts-ignore
		const res: FullConstantName = {}

		data.forEach((item: Constant) => {
			res[`${kebabToCamel(item.type)}_${kebabToCamel(item.name)}`] =
				item.value
		})

		return res
	}

	async put(constant: ConstantDto) {
		const url = `/${this.url}`
		const data = (await request({
			url,
			method: 'put',
			body: constant,
		})) as Constant

		if (data) {
			return data
		}
	}

	async delete(queryParams: {
		language?: Language
		type?: ConstantType
		name?: ConstantName
	}) {
		const url = `/${this.url}?${this.queryParams(queryParams)}`
		const data = (await request({ url, method: 'delete' })) as Constant

		if (data) {
			return data
		}
	}

	private queryParams({
		language,
		type,
		name,
	}: {
		language?: Language
		type?: ConstantType
		name?: ConstantName
	}) {
		const queryParams = new URLSearchParams()
		if (language !== undefined) queryParams.append('language', language)
		if (type !== undefined) queryParams.append('type', CONSTANT_TYPES[type])
		if (name !== undefined) queryParams.append('name', CONSTANT_NAMES[name])

		return queryParams.toString()
	}
}

export const constantApi = new ConstantApi()
