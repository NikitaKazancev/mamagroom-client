'use server'

import { objectFromFormData } from '@/utils/functions'
import console from 'console'
import { revalidateTag } from 'next/cache'
import { REVALIDATE_TAGS } from '../request'
import { breedApi, BreedDto } from './breed.api'

export const postBreed = async (
	formData: FormData,
	permanentData: BreedDto
) => {
	const data = objectFromFormData(formData)
	console.log(permanentData)

	const res = await breedApi.post({ ...permanentData, ...data })
	revalidateTag(REVALIDATE_TAGS.breeds)

	return res
}

export const putBreed = async (formData: FormData, initialData: BreedDto) => {
	const data = objectFromFormData(formData)

	const res = await breedApi.put(initialData.id, { ...initialData, ...data })
	revalidateTag(REVALIDATE_TAGS.breeds)

	return res
}

export const deleteBreed = async (id: string) => {
	await breedApi.delete(id)
	revalidateTag(REVALIDATE_TAGS.breeds)
}

export const recoverBreed = async (data: BreedDto) => {
	await breedApi.put(data.id, { ...data, isDeleted: false })
	revalidateTag(REVALIDATE_TAGS.breeds)
}
