import { MasterDto } from '@/api/master/master.api'
import { Settings } from '@/modules/settings/settings'
import { Roles } from '@/utils/auth/auth'
import { SettingsMasterForm } from './master-form'

export const SettingsMaster = ({
	data,
	iconClassname,
	roles,
	theme,
	formTitle,
}: {
	data: MasterDto
	iconClassname?: string
	roles: Roles
	theme?: 'light' | 'dark'
	formTitle: string
}) => {
	if (!roles.masterPut && !roles.masterDelete) return null

	return (
		<Settings
			Component={SettingsMasterForm}
			iconClassname={iconClassname}
			type='master'
			data={data}
			theme={theme}
			isDeleted={data.isDeleted}
			formTitle={formTitle}
		/>
	)
}
