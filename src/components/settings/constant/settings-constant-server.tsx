'use server'

import { ConstantDto } from '@/api/constant/constant.types'
import { useLanguage, useRoles } from '@/context/my-server-context'
import { Settings } from '@/modules/settings/settings'
import { SettingsFormType } from '@/modules/settings/utils/store'
import { SettingsConstantForm } from './settings-constant-form'

export const SettingsConstantServer = ({
	children,
	title,
	data,
	iconClassname,
	type,
	theme,
	formTitle,
}: {
	children: React.ReactNode
	title: string
	data: ConstantDto
	iconClassname?: string
	type: SettingsFormType
	theme?: 'light' | 'dark'
	formTitle: string
}) => {
	const language = useLanguage()
	const roles = useRoles()

	data.language = language

	return (
		<div className='relative'>
			{children}
			{roles.constantPut && (
				<Settings
					Component={SettingsConstantForm}
					componentProps={{ title }}
					iconClassname={iconClassname}
					type={type}
					data={data}
					theme={theme}
					formTitle={formTitle}
				/>
			)}
		</div>
	)
}
