'use server'

import { objectFromFormData } from '@/utils/functions'
import { revalidateTag } from 'next/cache'
import { REVALIDATE_TAGS } from '../request'
import { constantApi } from './constant.api'
import { ConstantDto } from './constant.types'

export const putConstant = async (
	formData: FormData,
	initialData: ConstantDto
) => {
	const data = objectFromFormData(formData)
	if (!data.value) return

	const res = await constantApi.put({
		...initialData,
		...data,
	})
	revalidateTag(REVALIDATE_TAGS.constants)

	return res
}
