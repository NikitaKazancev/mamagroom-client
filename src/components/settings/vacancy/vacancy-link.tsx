import { VacancyDto } from '@/api/vacancy/vacancy.api'
import { Settings } from '@/modules/settings/settings'
import { Roles } from '@/utils/auth/auth'
import { SettingsVacancyForm } from './vacancy-form'

export const SettingsVacancy = ({
	data,
	iconClassname,
	roles,
	theme,
	formTitle,
}: {
	data: VacancyDto
	iconClassname?: string
	roles: Roles
	theme?: 'light' | 'dark'
	formTitle: string
}) => {
	if (!roles.vacancyPut && !roles.vacancyDelete) return null

	return (
		<Settings
			Component={SettingsVacancyForm}
			iconClassname={iconClassname}
			type='vacancy'
			data={data}
			theme={theme}
			isDeleted={data.isDeleted}
			formTitle={formTitle}
		/>
	)
}
