import { Language } from '@/i18n'
import { basicQueryParams, request } from '../request'

export type HeaderNavbarLink = {
	id: string
	createdAt: Date
	link?: string
	name: string
	language: string
	updatedAt: Date
	isDeleted: boolean
	order: number
	parentLinkId?: string
	sublinks: HeaderNavbarLink[]
}

export type HeaderNavbarLinkDto = {
	language: Language
	name: string
	order?: number
	link?: string
	parentLinkId?: string
	isDeleted?: boolean
}

class HeaderNavbarLinkApi {
	url = 'header-navbar-links'

	async findMany(queryParams: { language?: Language; isDeleted?: boolean }) {
		const url = `/${this.url}?${basicQueryParams(queryParams)}`
		const data = (await request({ url })) as HeaderNavbarLink[]

		if (data) {
			return data
		}

		return []
	}

	async findById(id: string) {
		const url = `/${this.url}/${id}`
		const data = (await request({ url })) as HeaderNavbarLink

		if (data) {
			return data
		}
	}

	async post(headerNavbarLink: HeaderNavbarLinkDto) {
		const url = `/${this.url}`
		const data = (await request({
			url,
			method: 'post',
			body: headerNavbarLink,
		})) as HeaderNavbarLink

		if (data) {
			return data
		}
	}

	async put(id: string, headerNavbarLink: HeaderNavbarLinkDto) {
		const url = `/${this.url}/${id}`
		const data = (await request({
			url,
			method: 'put',
			body: headerNavbarLink,
		})) as HeaderNavbarLink

		if (data) {
			return data
		}
	}

	async delete(id: string) {
		const url = `/${this.url}/${id}`
		const data = (await request({
			url,
			method: 'delete',
		})) as HeaderNavbarLink

		if (data) {
			return data
		}
	}
}

export const headerNavbarLinkApi = new HeaderNavbarLinkApi()
