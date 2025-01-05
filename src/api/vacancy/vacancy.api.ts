import { Language } from '@/i18n'
import { basicQueryParams, request } from '../request'

type Vacancy = {
	name: string
	language: string
	isDeleted: boolean
	id: string
	createdAt: Date
	description: string
	updatedAt: Date
}

type VacancyDto = {
	language: Language
	name: string
	description?: string
	isDeleted?: boolean
}

class VacancyApi {
	url = 'vacancies'

	async findMany(queryParams: { language?: Language; isDeleted?: boolean }) {
		const url = `/${this.url}?${basicQueryParams(queryParams)}`
		const data = await request({ url })

		if (data) {
			return data as Vacancy[]
		}

		return []
	}

	async findById(id: string) {
		const url = `/${this.url}/${id}`
		const data = await request({ url })

		if (data) {
			return data as Vacancy
		}
	}

	async post(vacancy: VacancyDto) {
		const url = `/${this.url}`
		const data = await request({ url, method: 'post', body: vacancy })

		if (data) {
			return data as Vacancy
		}
	}

	async put(id: string, vacancy: VacancyDto) {
		const url = `/${this.url}/${id}`
		const data = await request({ url, method: 'put', body: vacancy })

		if (data) {
			return data as Vacancy
		}
	}

	async delete(id: string) {
		const url = `/${this.url}/${id}`
		const data = await request({ url, method: 'delete' })

		if (data) {
			return data as Vacancy
		}
	}
}

export const vacancyApi = new VacancyApi()
