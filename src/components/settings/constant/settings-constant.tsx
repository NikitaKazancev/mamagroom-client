'use server'

import { ConstantDto } from '@/api/constant/constant.types'
import { SettingsFormType } from '@/modules/settings/utils/store'
import { SettingsConstantServer } from './settings-constant-server'

export const SettingsConstant = (props: {
	children: React.ReactNode
	title: string
	data: ConstantDto
	iconClassname?: string
	type: SettingsFormType
	theme?: 'light' | 'dark'
	formTitle: string
}) => {
	return <SettingsConstantServer {...props} />
}
