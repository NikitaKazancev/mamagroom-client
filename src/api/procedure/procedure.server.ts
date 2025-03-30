'use server'

import { objectFromFormData } from '@/utils/functions'
import { revalidateTag } from 'next/cache'
import { REVALIDATE_TAGS } from '../request'
import { procedureApi, ProcedureDto } from './procedure.api'

export const postProcedure = async (
	formData: FormData,
	permanentData: ProcedureDto
) => {
	const data = objectFromFormData(formData)

	const res = await procedureApi.post({ ...permanentData, ...data })
	revalidateTag(REVALIDATE_TAGS.procedures)

	return res
}
