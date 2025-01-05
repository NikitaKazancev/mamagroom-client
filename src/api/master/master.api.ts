import { Language } from '@/i18n'
import { basicQueryParams, request } from '../request'

type Master = {
	name: string
	language: string
	isDeleted: boolean
	id: string
	imageName?: string
	createdAt: Date
	description?: string
	updatedAt: Date
}

type MasterDto = {
	language: Language
	name: string
	description?: string
	imageName?: string
	isDeleted?: boolean
}

class MasterApi {
	url = 'masters'

	async findMany(queryParams: { language?: Language; isDeleted?: boolean }) {
		const url = `/${this.url}?${basicQueryParams(queryParams)}`
		const data = await request({ url })

		if (data) {
			return data as Master[]
		}

		return []
	}

	async findById(id: string) {
		const url = `/${this.url}/${id}`
		const data = await request({ url })

		if (data) {
			return data as Master
		}
	}

	async post(master: MasterDto) {
		const url = `/${this.url}`
		const data = await request({
			url,
			method: 'post',
			body: master,
		})

		if (data) {
			return data as Master
		}
	}

	async put(id: string, master: MasterDto) {
		const url = `/${this.url}/${id}`
		const data = await request({ url, method: 'put', body: master })

		if (data) {
			return data as Master
		}
	}

	async delete(id: string) {
		const url = `/${this.url}/${id}`
		const data = await request({ url, method: 'delete' })

		if (data) {
			return data as Master
		}
	}
}

export const masterApi = new MasterApi()
