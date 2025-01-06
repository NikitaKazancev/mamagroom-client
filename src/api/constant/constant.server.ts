'use server'

import { revalidateTag } from 'next/cache'
import { revalidateTags } from '../request'
import { constantApi } from './constant.api'
import { ConstantDto } from './constant.types'

export const putConstant = async (constant: ConstantDto) => {
	await constantApi.put(constant)
	revalidateTag(revalidateTags.constants)
}
