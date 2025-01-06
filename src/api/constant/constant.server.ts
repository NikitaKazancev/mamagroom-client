'use server'

import { revalidateTag } from 'next/cache'
import { revalidateTags } from '../request'
import { constantApi } from './constant.api'

export const putConstant = async (formData: FormData, initialData: any) => {
	console.log(formData)

	const value = formData.get('value')
	if (!value) return

	await constantApi.put({
		...initialData,
		value: value.toString(),
	})
	revalidateTag(revalidateTags.constants)
}
