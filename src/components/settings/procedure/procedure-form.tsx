'use client'

import { ProcedureDto } from '@/api/procedure/procedure.api'
import {
	SettingFormSetData,
	SettingsFormData,
} from '@/modules/settings/utils/store'
import { Input } from '@/ui/input/input'

export const SettingsProcedureForm = ({
	data,
	setData,
}: {
	data: SettingsFormData
	setData: SettingFormSetData
}) => {
	if (!data) return
	const localData = data as ProcedureDto

	const onChange = (e: any) => {
		if (e.target) {
			setData({ ...localData, [e.target.name]: e.target.value })
		} else {
			setData({ ...localData, [e.name]: e.value })
		}
	}

	return (
		<>
			<Input
				name='name'
				onChange={onChange}
				title='Название'
				required
				value={localData.name}
			/>
		</>
	)
}
