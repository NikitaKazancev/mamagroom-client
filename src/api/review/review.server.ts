'use server'

import { objectFromFormData } from '@/utils/functions'
import { revalidateTag } from 'next/cache'
import { REVALIDATE_TAGS } from '../request'
import { reviewApi, ReviewDto } from './review.api'

export const postReview = async (
	formData: FormData,
	permanentData: ReviewDto
) => {
	const data = objectFromFormData(formData)

	const res = await reviewApi.post({ ...permanentData, ...data })
	revalidateTag(REVALIDATE_TAGS.reviews)

	return res
}

export const putReview = async (formData: FormData, initialData: ReviewDto) => {
	const data = objectFromFormData(formData)

	const res = await reviewApi.put(initialData.id, { ...initialData, ...data })
	revalidateTag(REVALIDATE_TAGS.reviews)

	return res
}

export const deleteReview = async (id: string) => {
	await reviewApi.delete(id)
	revalidateTag(REVALIDATE_TAGS.reviews)
}
