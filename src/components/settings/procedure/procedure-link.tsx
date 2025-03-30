import { ProcedureDto } from '@/api/procedure/procedure.api'
import { Settings } from '@/modules/settings/settings'
import { Roles } from '@/utils/auth/auth'
import { SettingsProcedureForm } from './procedure-form'

export const SettingsProcedure = ({
	data,
	iconClassname,
	roles,
	theme,
	formTitle,
}: {
	data: ProcedureDto
	iconClassname?: string
	roles: Roles
	theme?: 'light' | 'dark'
	formTitle: string
}) => {
	if (!roles.procedurePut && !roles.procedureDelete) return null

	return (
		<Settings
			Component={SettingsProcedureForm}
			iconClassname={iconClassname}
			type='procedure'
			data={data}
			theme={theme}
			isDeleted={data.isDeleted}
			formTitle={formTitle}
		/>
	)
}
