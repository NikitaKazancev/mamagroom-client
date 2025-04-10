import { Language } from '@/i18n/types'
import { basicQueryParams, fullImageName, request } from '../request'

export type Master = {
	name: string
	language: Language
	isDeleted: boolean
	id: string
	imageName?: string
	position?: string
	createdAt: Date
	description?: string
	updatedAt: Date
}

export type MasterDto = {
	id: string
	language: Language
	name: string
	description?: string
	position?: string
	imageName?: string
	isDeleted?: boolean
}

class MasterApi {
	url = 'masters'

	async findMany(queryParams: { language?: Language; isDeleted?: boolean }) {
		const url = `/${this.url}?${basicQueryParams(queryParams)}`
		const data = (await request({
			url,
			revalidateTag: 'masters',
		})) as Master[]

		if (data) {
			data.forEach(master => {
				master.imageName = fullImageName(master.imageName)
			})
			return data
		}

		return []
	}

	async findById(id: string) {
		const url = `/${this.url}/${id}`
		const data = (await request({ url, revalidateTag: 'masters' })) as Master

		if (data) {
			data.imageName = fullImageName(data.imageName)
			return data
		}
	}

	async post(master: FormData) {
		const url = `/${this.url}`
		const data = (await request({
			url,
			method: 'post',
			body: master,
		})) as Master

		if (data) {
			data.imageName = fullImageName(data.imageName)
			return data
		}
	}

	async put(id: string, master: FormData | MasterDto) {
		const url = `/${this.url}/${id}`
		const data = (await request({
			url,
			method: 'put',
			body: master,
		})) as Master

		if (data) {
			data.imageName = fullImageName(data.imageName)
			return data
		}
	}

	async delete(id: string) {
		const url = `/${this.url}/${id}`
		const data = (await request({ url, method: 'delete' })) as Master

		if (data) {
			data.imageName = fullImageName(data.imageName)
			return data
		}
	}
}

export const masterApi = new MasterApi()
