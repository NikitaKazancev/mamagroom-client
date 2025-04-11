'use client'

import { ReviewDto } from '@/api/review/review.api'
import {
	SettingFormSetData,
	SettingsFormData,
} from '@/modules/settings/utils/store'
import { Input } from '@/ui/input/input'
import { TextArea } from '@/ui/textarea/textarea'

export const SettingsReviewForm = ({
	data,
	setData,
}: {
	data: SettingsFormData
	setData: SettingFormSetData
}) => {
	if (!data) return
	const localData = data as ReviewDto

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
				title='Имя пользователя'
				value={localData.name}
				onChange={onChange}
				required
			/>
			<Input
				name='date'
				title='Дата отзыва'
				type='date'
				value={localData.date}
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
		</>
	)
}
