'use client'

import { FILE_PATHS } from '@/api/file/file.api'
import { Input } from '@/ui/input/input'

export const SettingsFileForm = () => {
	return (
		<>
			<Input name='file' title='File' required type='file' />
			<Input name='path' title='' value={FILE_PATHS.mainBg} invisible />
		</>
	)
}
