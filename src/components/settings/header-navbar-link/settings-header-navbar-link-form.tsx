'use client'

import {
	HeaderNavbarLink,
	HeaderNavbarLinkDto,
} from '@/api/header-navbar-link/header-navbar-link.api'
import {
	SettingFormSetData,
	SettingsFormData,
} from '@/modules/settings/utils/store'
import { DropDown } from '@/ui/drop-down/drop-down'
import { Input } from '@/ui/input/input'

export const SettingsHeaderNavbarLinkForm = ({
	data,
	setData,
	allData,
}: {
	data: SettingsFormData
	setData: SettingFormSetData
	allData?: HeaderNavbarLink[]
}) => {
	if (!data || !allData) return
	const localData = data as HeaderNavbarLinkDto
	const localAllData = allData as HeaderNavbarLink[]

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
			<DropDown
				items={localAllData.map(data => data.name)}
				titleElement={<div>Test</div>}
			/>
		</>
	)
}
