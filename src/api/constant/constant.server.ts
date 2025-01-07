'use server'

import { revalidateTag } from 'next/cache'
import { revalidateTags } from '../request'
import { constantApi } from './constant.api'
import { ConstantDto } from './constant.types'

export const putConstant = async (
	formData: FormData,
	initialData: ConstantDto
) => {
	const value = formData.get('value')
	if (!value) return

	await constantApi.put({
		...initialData,
		value: value.toString(),
	})
	revalidateTag(revalidateTags.constants)
}
