import { ConstantDto } from '@/api/constant/constant.types'
import { Settings } from '@/modules/settings/settings'
import { SettingsFormType } from '@/modules/settings/utils/store'
import { Roles } from '@/utils/auth/auth'
import { SettingsConstantForm } from './settings-constant-form'

export const SettingsConstant = ({
	children,
	title,
	data,
	iconClassname,
	type,
	roles,
	theme,
	formTitle,
}: {
	children: React.ReactNode
	title: string
	data: ConstantDto
	iconClassname?: string
	type: SettingsFormType
	roles: Roles
	theme?: 'light' | 'dark'
	formTitle: string
}) => {
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
