import { ValueDto } from '@/api/values/values.api'
import { Settings } from '@/modules/settings/settings'
import { Roles } from '@/utils/auth/auth'
import { SettingsValueForm } from './values-form'

export const SettingsValue = ({
	data,
	iconClassname,
	roles,
	theme,
	formTitle,
}: {
	data: ValueDto
	iconClassname?: string
	roles: Roles
	theme?: 'light' | 'dark'
	formTitle: string
}) => {
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
