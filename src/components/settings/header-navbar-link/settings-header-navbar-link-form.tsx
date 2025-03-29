'use client'

import {
	HeaderNavbarLink,
	HeaderNavbarLinkDto,
} from '@/api/header-navbar-link/header-navbar-link.api'
import {
	SettingFormSetData,
	SettingsFormData,
} from '@/modules/settings/utils/store'
import { Input } from '@/ui/input/input'

export const SettingsHeaderNavbarLinkForm = ({
	data,
	setData,
	headerNavbarLinks,
	method,
}: {
	data: SettingsFormData
	setData: SettingFormSetData
	headerNavbarLinks?: HeaderNavbarLink[]
	method?: 'post' | 'put'
}) => {
	if (!data || !headerNavbarLinks) return
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
				value={localData.order}
				required={method === 'put'}
			/>
			<Input
				name='link'
				onChange={onChange}
				title='Ссылка'
				value={localData.link}
				required
			/>
			{/* <Select
				name='parentLinkId'
				title='Родительская ссылка'
				options={headerNavbarLinks.map(data => ({
					name: data.name,
					value: data.id,
				}))}
				value={localData.parentLinkId}
				onChange={onChange}
			/> */}
		</>
	)
}
