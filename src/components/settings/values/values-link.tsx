'use client'

import { ValueDto } from '@/api/values/values.api'
import { Settings } from '@/modules/settings/settings'
import { SettingsValueForm } from './values-form'
import { useMyContext } from '@/context/my-context'

export const SettingsValue = ({
	data,
	iconClassname,
	theme,
	formTitle,
}: {
	data: ValueDto
	iconClassname?: string
	theme?: 'light' | 'dark'
	formTitle: string
}) => {
	const roles = useMyContext().roles
	if (!roles.valuePut && !roles.valueDelete) return null

	return (
		<Settings
			Component={SettingsValueForm}
			iconClassname={iconClassname}
			type='value'
			data={data}
			theme={theme}
			isDeleted={data.isDeleted}
			formTitle={formTitle}
		/>
	)
}
