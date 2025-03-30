import { Language } from '@/i18n/types'
import { basicQueryParams, request } from '../request'

export type Vacancy = {
	name: string
	language: Language
	isDeleted: boolean
	id: string
	createdAt: Date
	description?: string
	link: string
	updatedAt: Date
}

export type VacancyDto = {
	id: string
	language: Language
	name: string
	description?: string
	link: string
	isDeleted?: boolean
}

class VacancyApi {
	url = 'vacancies'

	async findMany(queryParams: { language?: Language; isDeleted?: boolean }) {
		const url = `/${this.url}?${basicQueryParams(queryParams)}`
		const data = (await request({
			url,
			revalidateTag: 'vacancies',
		})) as Vacancy[]

		if (data) {
			return data
		}

		return []
	}

	async findById(id: string) {
		const url = `/${this.url}/${id}`
		const data = (await request({ url })) as Vacancy

		if (data) {
			return data
		}
	}

	async post(vacancy: VacancyDto) {
		const url = `/${this.url}`
		const data = (await request({
			url,
			method: 'post',
			body: vacancy,
		})) as Vacancy

		if (data) {
			return data
		}
	}

	async put(id: string, vacancy: VacancyDto) {
		const url = `/${this.url}/${id}`
		const data = (await request({
			url,
			method: 'put',
			body: vacancy,
		})) as Vacancy

		if (data) {
			return data
		}
	}

	async delete(id: string) {
		const url = `/${this.url}/${id}`
		const data = (await request({ url, method: 'delete' })) as Vacancy

		if (data) {
			return data
		}
	}
}

export const vacancyApi = new VacancyApi()
