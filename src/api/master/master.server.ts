'use server'

import { revalidateTag } from 'next/cache'
import { REVALIDATE_TAGS } from '../request'
import { masterApi, MasterDto } from './master.api'

export const postMaster = async (formData: FormData) => {
	const res = await masterApi.post(formData)
	revalidateTag(REVALIDATE_TAGS.masters)

	return res
}

export const putMaster = async (formData: FormData, initialData: MasterDto) => {
	if (
		formData.get('file') === null ||
		(formData.get('file') as File).name === 'undefined'
	) {
		formData.delete('file')
	}

	const res = await masterApi.put(initialData.id, formData)
	revalidateTag(REVALIDATE_TAGS.masters)

	return res
}

export const deleteMaster = async (id: string) => {
	await masterApi.delete(id)
	revalidateTag(REVALIDATE_TAGS.masters)
}

export const recoverMaster = async (data: MasterDto) => {
	await masterApi.put(data.id, { ...data, isDeleted: false })
	revalidateTag(REVALIDATE_TAGS.masters)
}
