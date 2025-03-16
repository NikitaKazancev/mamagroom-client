'use client'

import { ValueDto } from '@/api/values/values.api'
import {
	SettingFormSetData,
	SettingsFormData,
} from '@/modules/settings/utils/store'
import { Input } from '@/ui/input/input'

export const SettingsValueForm = ({
	data,
	setData,
	method,
}: {
	data: SettingsFormData
	setData: SettingFormSetData
	method?: 'post' | 'put'
}) => {
	if (!data) return
	const localData = data as ValueDto

	const onChange = (e: any) => {
		if (e.target) {
			setData({ ...localData, [e.target.name]: e.target.value })
		} else {
			setData({ ...localData, [e.name]: e.value })
		}
	}

	return (
		<>
			<Input
				name='title'
				onChange={onChange}
				title='Название'
				required
				value={localData.title}
			/>
			<Input
				name='description'
				onChange={onChange}
				title='Описание'
				required
				value={localData.description}
			/>
			<Input
				name='file'
				title='File'
				required={method === 'post'}
				type='file'
			/>
			<Input name='language' title='' value={localData.language} invisible />
		</>
	)
}
