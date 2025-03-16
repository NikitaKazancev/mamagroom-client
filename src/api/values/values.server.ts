'use server'

import { revalidateTag } from 'next/cache'
import { REVALIDATE_TAGS } from '../request'
import { valueApi, ValueDto } from './values.api'

export const postValue = async (formData: FormData) => {
	const res = await valueApi.post(formData)
	revalidateTag(REVALIDATE_TAGS.values)

	return res
}

export const putValue = async (formData: FormData, initialData: ValueDto) => {
	if (
		formData.get('file') === null ||
		(formData.get('file') as File).name === 'undefined'
	) {
		formData.delete('file')
	}

	const res = await valueApi.put(initialData.id, formData)
	revalidateTag(REVALIDATE_TAGS.values)

	return res
}

export const deleteValue = async (id: string) => {
	await valueApi.delete(id)
	revalidateTag(REVALIDATE_TAGS.values)
}

export const recoverValue = async (data: ValueDto) => {
	await valueApi.put(data.id, { ...data, isDeleted: false })
	revalidateTag(REVALIDATE_TAGS.values)
}
