import { BreedDto } from '@/api/breed/breed.api'
import { Settings } from '@/modules/settings/settings'
import { Roles } from '@/utils/auth/auth'
import { SettingsBreedForm } from './breeds-form'

export const SettingsBreed = ({
	data,
	iconClassname,
	roles,
	theme,
}: {
	data: BreedDto
	iconClassname?: string
	roles: Roles
	theme?: 'light' | 'dark'
}) => {
	if (!roles.breedPut && !roles.breedDelete) return null

	return (
		<Settings
			Component={SettingsBreedForm}
			iconClassname={iconClassname}
			type='breed'
			data={data}
			theme={theme}
			isDeleted={data.isDeleted}
		/>
	)
}
