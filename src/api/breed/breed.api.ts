import { Language } from '@/i18n/types'
import { basicQueryParams, request } from '../request'

type BreedType = 'cat' | 'smallDog' | 'mediumDog' | 'bigDog'

type Breed = {
	id: string
	createdAt: Date
	name: string
	language: Language
	updatedAt: Date
	isDeleted: boolean
	type: BreedType
}

type BreedDto = {
	language: Language
	name: string
	type: BreedType
	isDeleted?: boolean
}

class BreedApi {
	url = 'breeds'

	async findMany(queryParams: { language?: Language; isDeleted?: boolean }) {
		const url = `/${this.url}?${basicQueryParams(queryParams)}`
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
}

export const breedApi = new BreedApi()
