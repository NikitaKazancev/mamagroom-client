'use server'

import { MasterDto } from '@/api/master/master.api'
import { useRoles } from '@/context/my-server-context'
import { Settings } from '@/modules/settings/settings'
import { SettingsMasterForm } from './master-form'

export const SettingsMaster = ({
	data,
	iconClassname,
	theme,
	formTitle,
}: {
	data: MasterDto
	iconClassname?: string
	theme?: 'light' | 'dark'
	formTitle: string
}) => {
	const roles = useRoles()
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
