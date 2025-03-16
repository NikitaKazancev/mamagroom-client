'use server'

import { objectFromFormData } from '@/utils/functions'
import { revalidateTag } from 'next/cache'
import { REVALIDATE_TAGS } from '../request'
import { priceApi, PriceDto } from './price.api'

export const postPrice = async (
	formData: FormData,
	permanentData: PriceDto
) => {
	const data = objectFromFormData(formData)

	const res = await priceApi.post({ ...permanentData, ...data })
	revalidateTag(REVALIDATE_TAGS.prices)

	return res
}

export const putPrice = async (formData: FormData, initialData: PriceDto) => {
	const data = objectFromFormData(formData)

	const res = await priceApi.put(initialData.id, { ...initialData, ...data })
	revalidateTag(REVALIDATE_TAGS.prices)

	return res
}

export const deletePrice = async (id: string) => {
	await priceApi.delete(id)
	revalidateTag(REVALIDATE_TAGS.prices)
}

export const recoverPrice = async (data: PriceDto) => {
	await priceApi.put(data.id, { ...data, isDeleted: false })
	revalidateTag(REVALIDATE_TAGS.prices)
}
