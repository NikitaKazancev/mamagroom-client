'use client'

import { BreedDto } from '@/api/breed/breed.api'
import {
	SettingFormSetData,
	SettingsFormData,
} from '@/modules/settings/utils/store'
import { Input } from '@/ui/input/input'
import { Select } from '@/ui/select/select'

export const SettingsBreedForm = ({
	data,
	setData,
}: {
	data: SettingsFormData
	setData: SettingFormSetData
}) => {
	if (!data) return
	const localData = data as BreedDto

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
				title='Название'
				required
				value={localData.name}
			/>
			<Select
				name='type'
				required
				title='Тип породы'
				options={[
					{ name: 'Мелкая собака', value: 'smallDog' },
					{ name: 'Средняя собака', value: 'mediumDog' },
					{ name: 'Крупная собака', value: 'bigDog' },
					{ name: 'Кошка', value: 'cat' },
				]}
				value={localData.type}
				onChange={onChange}
			/>
		</>
	)
}
