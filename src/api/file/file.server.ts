'use server'

import { objectFromFormData } from '@/utils/functions'
import { revalidateTag } from 'next/cache'
import { REVALIDATE_TAGS } from '../request'
import { ExternalPath, fileApi } from './file.api'

export const postFile = async (formData: FormData) => {
	const data = objectFromFormData(formData)
	if (!data.path || !data.file) return

	await fileApi.post(data.path as ExternalPath, formData)
	revalidateTag(REVALIDATE_TAGS.files)
}
