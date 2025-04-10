'use server'

import { revalidateTag } from 'next/cache'
import { REVALIDATE_TAGS } from './request'

export const revalidateAllTags = async () => {
	Object.values(REVALIDATE_TAGS).forEach(tag => revalidateTag(tag))
}
