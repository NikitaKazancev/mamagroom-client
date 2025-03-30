import { Language } from '@/i18n/types'
import { basicQueryParams, request } from '../request'

export type Procedure = {
	name: string
	id: string
	createdAt: Date
	updatedAt: Date
	isDeleted: boolean
	description?: string
	language: Language
}

export type ProcedureDto = {
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
			res = (await request({ url, body: { ...data, file } })) as Procedure[]
		} else {
			const url = `/${this.url}?${basicQueryParams({ language, isDeleted })}`
			res = (await request({
				url,
				revalidateTag: 'procedures',
			})) as Procedure[]
		}

		if (res) {
			return res as Procedure[]
		}

		return []
	}

	async findById(id: string) {
		const url = `/${this.url}/${id}`
		const data = (await request({ url })) as Procedure

		if (data) {
			return data
		}
	}

	async findByUserData(formData: FormData) {
		const url = `/${this.url}/ai`
		const data = (await request({
			url,
			method: 'post',
			body: formData,
		})) as {
			procedures: Procedure[]
			breedId: string
		}

		if (data) {
			return data
		}

		return {
			procedures: [],
			breedId: '',
		}
	}

	async post(procedure: ProcedureDto) {
		const url = `/${this.url}`
		const data = (await request({
			url,
			method: 'post',
			body: procedure,
		})) as Procedure

		if (data) {
			return data
		}
	}

	async put(id: string, procedure: ProcedureDto) {
		const url = `/${this.url}/${id}`
		const data = (await request({
			url,
			method: 'put',
			body: procedure,
		})) as Procedure

		if (data) {
			return data
		}
	}

	async delete(id: string) {
		const url = `/${this.url}/${id}`
		const data = (await request({ url, method: 'delete' })) as Procedure

		if (data) {
			return data
		}
	}
}

export const procedureApi = new ProcedureApi()
