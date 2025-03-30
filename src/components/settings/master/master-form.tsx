'use client'

import { MasterDto } from '@/api/master/master.api'
import {
	SettingFormSetData,
	SettingsFormData,
} from '@/modules/settings/utils/store'
import { Input } from '@/ui/input/input'
import { TextArea } from '@/ui/textarea/textarea'

export const SettingsMasterForm = ({
	data,
	setData,
	method,
}: {
	data: SettingsFormData
	setData: SettingFormSetData
	method?: 'post' | 'put'
}) => {
	if (!data) return
	const localData = data as MasterDto

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
				name='name'
				onChange={onChange}
				title='Имя'
				required
				value={localData.name}
			/>
			<Input
				name='position'
				onChange={onChange}
				title='Должность'
				required
				value={localData.position}
			/>
			<TextArea
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
