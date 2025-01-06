'use server'

import { ConstantDto } from '@/api/constant/constant.types'
import { Input } from '@/ui/input/input'

export const SettingsConstantForm = async ({
	title,
	data,
}: {
	title?: string
	data?: ConstantDto
}) => {
	if (!data || !title) return

	return (
		<Input title={title} name='value' required initialValue={data.value} />
	)
}
