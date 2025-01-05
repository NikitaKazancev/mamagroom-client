import { Language } from '@/i18n'
import { basicQueryParams, request } from '../request'

type Procedure = {
	name: string
	id: string
	createdAt: Date
	updatedAt: Date
	isDeleted: boolean
	description?: string
	language: string
}

type ProcedureDto = {
	language: Language
	name: string
	description?: string
	isDeleted?: boolean
}

class ProcedureApi {
	url = 'procedures'

	async findMany({
		language,
		isDeleted,
		data,
		file,
	}: {
		language?: Language
		isDeleted?: boolean
		data?: { description: string }
		file?: any
	}) {
		let res: unknown
		if (data?.description || file) {
			const url = this.url
			res = await request({ url, body: { ...data, file } })
		} else {
			const url = `/${this.url}?${basicQueryParams({ language, isDeleted })}`
			res = await request({ url })
		}

		if (res) {
			return res as Procedure[]
		}

		return []
	}

	async findById(id: string) {
		const url = `/${this.url}/${id}`
		const data = await request({ url })

		if (data) {
			return data as Procedure
		}
	}

	async post(procedure: ProcedureDto) {
		const url = `/${this.url}`
		const data = await request({
			url,
			method: 'post',
			body: procedure,
		})

		if (data) {
			return data as Procedure
		}
	}

	async put(id: string, procedure: ProcedureDto) {
		const url = `/${this.url}/${id}`
		const data = await request({ url, method: 'put', body: procedure })

		if (data) {
			return data as Procedure
		}
	}

	async delete(id: string) {
		const url = `/${this.url}/${id}`
		const data = await request({ url, method: 'delete' })

		if (data) {
			return data as Procedure
		}
	}
}

export const procedureApi = new ProcedureApi()
