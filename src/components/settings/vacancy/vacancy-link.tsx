'use server'

import { VacancyDto } from '@/api/vacancy/vacancy.api'
import { useRoles } from '@/context/my-server-context'
import { Settings } from '@/modules/settings/settings'
import { SettingsVacancyForm } from './vacancy-form'

export const SettingsVacancy = ({
	data,
	iconClassname,
	theme,
	formTitle,
}: {
	data: VacancyDto
	iconClassname?: string
	theme?: 'light' | 'dark'
	formTitle: string
}) => {
	const roles = useRoles()
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
