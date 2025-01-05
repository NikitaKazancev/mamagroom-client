import { Language } from '@/i18n'
import { basicQueryParams, request } from '../request'

type BreedType = 'cat' | 'smallDog' | 'mediumDog' | 'bigDog'

type Breed = {
	id: string
	createdAt: Date
	name: string
	language: string
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
		const data = await request({ url })

		if (data) {
			return data as Breed[]
		}

		return []
	}

	async findById(id: string) {
		const url = `/${this.url}/${id}`
		const data = await request({ url })

		if (data) {
			return data as Breed
		}
	}

	async post(breed: BreedDto) {
		const url = `/${this.url}`
		const data = await request({ url, method: 'post', body: breed })

		if (data) {
			return data as Breed
		}
	}

	async put(id: string, breed: BreedDto) {
		const url = `/${this.url}/${id}`
		const data = await request({ url, method: 'put', body: breed })

		if (data) {
			return data as Breed
		}
	}

	async delete(id: string) {
		const url = `/${this.url}/${id}`
		const data = await request({ url, method: 'delete' })

		if (data) {
			return data as Breed
		}
	}
}

export const breedApi = new BreedApi()
