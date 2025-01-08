'use client'

import { HeaderNavbarLinkDto } from '@/api/header-navbar-link/header-navbar-link.api'
import {
	SettingFormSetData,
	SettingsFormData,
} from '@/modules/settings/utils/store'
import { Input } from '@/ui/input/input'

export const SettingsHeaderNavbarLinkForm = ({
	data,
	setData,
}: {
	data: SettingsFormData
	setData: SettingFormSetData
}) => {
	if (!data) return
	const localData = data as HeaderNavbarLinkDto

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
			<Input
				type='number'
				name='order'
				onChange={onChange}
				title='Порядок'
				required
				value={localData.order}
			/>
			<Input
				name='link'
				onChange={onChange}
				title='Ссылка'
				value={localData.link}
			/>
			<Input
				type='number'
				name='parentLinkId'
				onChange={onChange}
				title='ID родительской категории'
				value={localData.parentLinkId}
			/>
		</>
	)
}
