import { BreedDto } from '@/api/breed/breed.api'
import { useMyContext } from '@/context/my-context'
import { Settings } from '@/modules/settings/settings'
import { SettingsBreedForm } from './breeds-form'

export const SettingsBreed = ({
	data,
	iconClassname,
	theme,
	formTitle,
}: {
	data: BreedDto
	iconClassname?: string
	theme?: 'light' | 'dark'
	formTitle: string
}) => {
	const roles = useMyContext().roles
	if (!roles.breedPut && !roles.breedDelete) return null

	return (
		<Settings
			Component={SettingsBreedForm}
			iconClassname={iconClassname}
			type='breed'
			data={data}
			theme={theme}
			isDeleted={data.isDeleted}
			formTitle={formTitle}
		/>
	)
}
