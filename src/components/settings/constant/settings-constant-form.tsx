'use client'

import { ConstantDto } from '@/api/constant/constant.types'
import { Input } from '@/ui/input/input'

export const SettingsConstantForm = (props: {
	title?: string
	data?: ConstantDto
	setData?: (data: ConstantDto) => void
}) => {
	if (!props?.data || !props?.title || !props?.setData) return null

	return (
		<Input
			title={props.title}
			name='value'
			required
			value={props.data.value}
			onChange={e => {
				//@ts-ignore
				props.setData({ ...props.data, value: e.target.value })
			}}
		/>
	)
}
