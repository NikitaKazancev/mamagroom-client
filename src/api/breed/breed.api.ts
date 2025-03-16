import { Language } from '@/i18n/types'
import { request } from '../request'

export type BreedType = 'cat' | 'smallDog' | 'mediumDog' | 'bigDog'

export type Breed = {
	id: string
	createdAt: Date
	name: string
	language: Language
	updatedAt: Date
	isDeleted: boolean
	type: BreedType
}

export type BreedDto = {
	id: string
	language: Language
	name: string
	type: BreedType
	isDeleted?: boolean
}

class BreedApi {
	url = 'breeds'

	async findMany(queryParams: {
		language?: Language
		isDeleted?: boolean
		type?: 'dogs' | 'cats'
	}) {
		const url = `/${this.url}?${this.queryParams(queryParams)}`
		const data = (await request({ url, revalidateTag: 'breeds' })) as Breed[]

		if (data) {
			return data
		}

		return []
	}

	async findById(id: string) {
		const url = `/${this.url}/${id}`
		const data = (await request({ url })) as Breed

		if (data) {
			return data
		}
	}

	async post(breed: BreedDto) {
		const url = `/${this.url}`
		const data = (await request({
			url,
			method: 'post',
			body: breed,
		})) as Breed

		if (data) {
			return data
		}
	}

	async put(id: string, breed: BreedDto) {
		const url = `/${this.url}/${id}`
		const data = (await request({ url, method: 'put', body: breed })) as Breed

		if (data) {
			return data
		}
	}

	async delete(id: string) {
		const url = `/${this.url}/${id}`
		const data = (await request({ url, method: 'delete' })) as Breed

		if (data) {
			return data
		}
	}

	private queryParams({
		language,
		type,
		isDeleted,
	}: {
		language?: Language
		type?: 'dogs' | 'cats'
		isDeleted?: boolean
	}) {
		const queryParams = new URLSearchParams()
		if (language !== undefined) queryParams.append('language', language)
		if (type !== undefined) queryParams.append('type', type)
		if (isDeleted !== undefined)
			queryParams.append('isDeleted', isDeleted.toString())

		return queryParams.toString()
	}
}

export const breedApi = new BreedApi()
