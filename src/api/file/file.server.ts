'use server'

import { FilePath, fileApi } from './file.api'

export const postFile = async (formData: FormData) => {
	const path = formData.get('path')
	const file = formData.get('file')
	if (!file || !path) return

	await fileApi.post(path as FilePath, file)
}
