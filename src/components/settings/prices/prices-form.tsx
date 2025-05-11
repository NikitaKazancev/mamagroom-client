'use client'

import { PriceDto } from '@/api/price/price.api'
import { Procedure } from '@/api/procedure/procedure.api'
import {
	SettingFormSetData,
	SettingsFormData,
} from '@/modules/settings/utils/store'
import { Input } from '@/ui/input/input'
import { Select } from '@/ui/select/select'
import { TextArea } from '@/ui/textarea/textarea'
import { useId } from 'react'

export const SettingsPriceForm = ({
	data,
	setData,
	procedures,
}: {
	data: SettingsFormData
	setData: SettingFormSetData
	procedures?: Procedure[]
}) => {
	const selectId = useId()
	const textareaId = useId()

	if (!data || !procedures) return
	const localData = data as PriceDto

	const onChange = (e: any) => {
		if (e.target) {
			setData({ ...localData, [e.target.name]: e.target.value })
		} else {
			setData({ ...localData, [e.name]: e.value })
		}
	}

	return (
		<>
			<Select
				name='procedureId'
				onChange={onChange}
				title='Процедура'
				options={procedures.map(data => ({
					name: data.name,
					value: data.id,
				}))}
				value={localData.procedureId}
				id={selectId}
			/>
			<Input
				name='weight'
				title='Вес'
				type='number'
				value={localData.weight}
				onChange={onChange}
			/>
			<Input
				name='time'
				title='Время'
				type='number'
				value={localData.time}
				onChange={onChange}
				required
			/>
			<Input
				name='price'
				title='Цена'
				type='number'
				value={localData.price}
				onChange={onChange}
				required
			/>
			<Input
				name='maxPrice'
				title='Максимальная цена'
				type='number'
				value={localData.maxPrice}
				onChange={onChange}
			/>
			<TextArea
				name='description'
				title='Описание'
				id={textareaId}
				value={localData.description}
				onChange={onChange}
			/>
		</>
	)
}
