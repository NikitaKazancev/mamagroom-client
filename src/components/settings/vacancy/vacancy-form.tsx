'use client'

import { VacancyDto } from '@/api/vacancy/vacancy.api'
import {
	SettingFormSetData,
	SettingsFormData,
} from '@/modules/settings/utils/store'
import { Input } from '@/ui/input/input'
import { TextArea } from '@/ui/textarea/textarea'

export const SettingsVacancyForm = ({
	data,
	setData,
}: {
	data: SettingsFormData
	setData: SettingFormSetData
}) => {
	if (!data) return
	const localData = data as VacancyDto

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
				title='Название'
				value={localData.name}
				onChange={onChange}
				required
			/>
			<TextArea
				name='description'
				title='Описание'
				value={localData.description}
				onChange={onChange}
				required
			/>
			<Input
				name='link'
				title='Ссылка'
				value={localData.link}
				onChange={onChange}
				required
			/>
		</>
	)
}
