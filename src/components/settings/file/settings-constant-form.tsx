'use client'

import { EXTERNAL_PATHS } from '@/api/file/file.api'
import { Input } from '@/ui/input/input'

export const SettingsFileForm = () => {
	return (
		<>
			<Input name='file' title='File' required type='file' />
			<Input name='path' title='' value={EXTERNAL_PATHS.mainBg} invisible />
		</>
	)
}
