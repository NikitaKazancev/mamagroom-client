import { Language } from '@/i18n/types'
import { request } from '../request'

export type Price = {
	id: string
	price: number
	createdAt: Date
	updatedAt: Date
	isDeleted: boolean
	breedId: string
	procedureId: string
	procedure: {
		id: string
		name: string
	}
	weight: number
	time: number
}

export type PriceDto = {
	id: string
	breedId: string
	procedureId: string
	weight?: number
	time?: number
	price: number
	isDeleted?: boolean
}

class PriceApi {
	url = 'prices'

	async findMany(queryParams: {
		breedId?: string
		procedureId?: string
		weight?: number
		time?: number
		language?: Language
		isDeleted?: boolean
	}) {
		const url = `/${this.url}?${this.queryParams(queryParams)}`
		const data = (await request({ url, revalidateTag: 'prices' })) as Price[]

		if (data) {
			return data
		}

		return []
	}

	async findById(id: string) {
		const url = `/${this.url}/${id}`
		const data = (await request({ url })) as Price

		if (data) {
			return data
		}
	}

	async post(price: PriceDto) {
		const url = `/${this.url}`
		const data = (await request({
			url,
			method: 'post',
			body: price,
		})) as Price

		if (data) {
			return data
		}
	}

	async put(id: string, price: PriceDto) {
		const url = `/${this.url}/${id}`
		const data = (await request({
			url,
			method: 'put',
			body: price,
		})) as Price

		if (data) {
			return data
		}
	}

	async delete(id: string) {
		const url = `/${this.url}/${id}`
		const data = (await request({ url, method: 'delete' })) as Price

		if (data) {
			return data
		}
	}

	private queryParams({
		breedId,
		procedureId,
		weight,
		time,
		language,
		isDeleted,
	}: {
		breedId?: string
		procedureId?: string
		weight?: number
		time?: number
		language?: Language
		isDeleted?: boolean
	}) {
		const queryParams = new URLSearchParams()
		if (breedId !== undefined) queryParams.append('breedId', breedId)
		if (procedureId !== undefined)
			queryParams.append('procedureId', procedureId)
		if (weight !== undefined) queryParams.append('weight', String(weight))
		if (time !== undefined) queryParams.append('time', String(time))
		if (language !== undefined)
			queryParams.append('language', String(language))
		if (isDeleted !== undefined)
			queryParams.append('isDeleted', String(isDeleted))

		return queryParams.toString()
	}
}

export const priceApi = new PriceApi()
