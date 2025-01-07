'use client'

import { ConstantDto } from '@/api/constant/constant.types'
import {
	SettingFormSetData,
	SettingsFormData,
	SettingsFormType,
} from '@/modules/settings/utils/store'
import { Input } from '@/ui/input/input'
import { TextArea } from '@/ui/textarea/textarea'

export const SettingsConstantForm = ({
	title,
	data,
	setData,
	type,
}: {
	title?: string
	data: SettingsFormData
	setData: SettingFormSetData
	type: SettingsFormType
}) => {
	if (!title || !data) return null
	const localData = data as ConstantDto

	const onChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		setData({ ...localData, [e.target.name]: e.target.value })
	}

	let result = null
	if (type === 'constant_short') {
		result = (
			<Input
				title={title}
				name='value'
				required
				value={localData.value}
				onChange={onChange}
			/>
		)
	} else {
		result = (
			<TextArea
				title={title}
				name='value'
				required
				value={localData.value}
				onChange={onChange}
			/>
		)
	}

	return result
}
