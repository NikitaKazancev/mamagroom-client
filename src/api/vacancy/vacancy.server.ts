'use server'

import { objectFromFormData } from '@/utils/functions'
import { revalidateTag } from 'next/cache'
import { REVALIDATE_TAGS } from '../request'
import { vacancyApi, VacancyDto } from './vacancy.api'

export const postVacancy = async (
	formData: FormData,
	permanentData: VacancyDto
) => {
	const data = objectFromFormData(formData)

	const res = await vacancyApi.post({ ...permanentData, ...data })
	revalidateTag(REVALIDATE_TAGS.vacancies)

	return res
}

export const putVacancy = async (
	formData: FormData,
	initialData: VacancyDto
) => {
	const data = objectFromFormData(formData)

	const res = await vacancyApi.put(initialData.id, { ...initialData, ...data })
	revalidateTag(REVALIDATE_TAGS.vacancies)

	return res
}

export const deleteVacancy = async (id: string) => {
	await vacancyApi.delete(id)
	revalidateTag(REVALIDATE_TAGS.vacancies)
}

export const recoverVacancy = async (data: VacancyDto) => {
	await vacancyApi.put(data.id, { ...data, isDeleted: false })
	revalidateTag(REVALIDATE_TAGS.vacancies)
}
