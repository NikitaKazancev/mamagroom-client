'use server'

import { objectFromFormData } from '@/utils/functions'
import { revalidateTag } from 'next/cache'
import { REVALIDATE_TAGS } from '../request'
import {
	headerNavbarLinkApi,
	HeaderNavbarLinkDto,
} from './header-navbar-link.api'

export const postHeaderNavbarLink = async (
	formData: FormData,
	permanentData: HeaderNavbarLinkDto
) => {
	const data = objectFromFormData(formData)
	if (!data.name || !data.order) return

	const res = await headerNavbarLinkApi.post({ ...permanentData, ...data })
	revalidateTag(REVALIDATE_TAGS.headerNavbarLink)

	return res
}

export const putHeaderNavbarLink = async (
	formData: FormData,
	initialData: HeaderNavbarLinkDto
) => {
	const data = objectFromFormData(formData)

	const res = await headerNavbarLinkApi.put({ ...initialData, ...data })
	revalidateTag(REVALIDATE_TAGS.headerNavbarLink)

	return res
}

export const deleteHeaderNavbarLink = async (id: string) => {
	await headerNavbarLinkApi.delete(id)
	revalidateTag(REVALIDATE_TAGS.headerNavbarLink)
}

export const recoverHeaderNavbarLink = async (data: HeaderNavbarLinkDto) => {
	await headerNavbarLinkApi.put({ ...data, isDeleted: false })
	revalidateTag(REVALIDATE_TAGS.headerNavbarLink)
}
