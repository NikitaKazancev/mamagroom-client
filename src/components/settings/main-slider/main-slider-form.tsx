'use client'

import { MainSliderDto } from '@/api/main-slider/main-slider.api'
import {
	SettingFormSetData,
	SettingsFormData,
} from '@/modules/settings/utils/store'
import { Input } from '@/ui/input/input'

export const SettingsMainSliderForm = ({
	data,
	setData,
	method,
}: {
	data: SettingsFormData
	setData: SettingFormSetData
	method?: 'post' | 'put'
}) => {
	if (!data) return
	const localData = data as MainSliderDto

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
				name='order'
				onChange={onChange}
				title='Порядок'
				type='number'
				value={localData.order}
				required={method === 'put'}
			/>
			<Input
				name='file'
				title='File'
				type='file'
				required={method === 'post'}
			/>
		</>
	)
}
