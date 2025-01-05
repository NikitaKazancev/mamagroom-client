import { request } from '../request'

type Price = {
	price: number
	createdAt: Date
	updatedAt: Date
	isDeleted: boolean
	breedId: string
	procedureId: string
	weight: number
	time: number
}

type PriceDto = {
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
	}) {
		const url = `/${this.url}?${this.queryParams(queryParams)}`
		const data = await request({ url })

		if (data) {
			return data as Price[]
		}

		return []
	}

	async put(price: PriceDto) {
		const url = `/${this.url}`
		const data = await request({ url, method: 'put', body: price })

		if (data) {
			return data as Price
		}
	}

	async delete(queryParams: {
		breedId?: string
		procedureId?: string
		weight?: number
		time?: number
	}) {
		const url = `/${this.url}?${this.queryParams(queryParams)}`
		const data = await request({ url, method: 'delete' })

		if (data) {
			return data as Price
		}
	}

	private queryParams({
		breedId,
		procedureId,
		weight,
		time,
	}: {
		breedId?: string
		procedureId?: string
		weight?: number
		time?: number
	}) {
		const queryParams = new URLSearchParams()
		if (breedId !== undefined) queryParams.append('breedId', breedId)
		if (procedureId !== undefined)
			queryParams.append('procedureId', procedureId)
		if (weight !== undefined) queryParams.append('weight', String(weight))
		if (time !== undefined) queryParams.append('time', String(time))

		return queryParams.toString()
	}
}

export const priceApi = new PriceApi()
