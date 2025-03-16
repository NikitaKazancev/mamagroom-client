'use server'

import { revalidateTag } from 'next/cache'
import { REVALIDATE_TAGS } from '../request'
import { mainSliderApi, MainSliderDto } from './main-slider.api'

export const postMainSlider = async (formData: FormData) => {
	const res = await mainSliderApi.post(formData)
	revalidateTag(REVALIDATE_TAGS.mainSlider)

	return res
}

export const putMainSlider = async (
	formData: FormData,
	initialData: MainSliderDto
) => {
	if (
		formData.get('file') === null ||
		(formData.get('file') as File).name === 'undefined'
	) {
		formData.delete('file')
	}

	const res = await mainSliderApi.put(initialData.id, formData)
	revalidateTag(REVALIDATE_TAGS.mainSlider)

	return res
}

export const deleteMainSlider = async (id: string) => {
	await mainSliderApi.delete(id)
	revalidateTag(REVALIDATE_TAGS.mainSlider)
}

export const recoverMainSlider = async (data: MainSliderDto) => {
	await mainSliderApi.put(data.id, { ...data, isDeleted: false })
	revalidateTag(REVALIDATE_TAGS.mainSlider)
}
