'use client'

import { ExternalPath } from '@/api/file/file.api'
import { SettingsFormData } from '@/modules/settings/utils/store'
import { Input } from '@/ui/input/input'

export const SettingsFileForm = ({ data }: { data: SettingsFormData }) => {
	if (!data) return null
	const localData = data as { path: ExternalPath }

	return (
		<>
			<Input name='file' title='File' required type='file' />
			<Input name='path' title='' value={localData.path} invisible />
		</>
	)
}
