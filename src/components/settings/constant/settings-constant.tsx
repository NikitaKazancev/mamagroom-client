import { ConstantDto } from '@/api/constant/constant.types'
import { Settings } from '@/modules/settings/settings'
import { ROLES } from '@/utils/auth/auth'
import { SettingsConstantForm } from './settings-constant-form'

export const SettingsConstant = ({
	children,
	title,
	data,
	iconClassname,
}: {
	children: React.ReactNode
	title: string
	data: ConstantDto
	iconClassname?: string
}) => {
	return (
		<div className='relative'>
			{children}
			{ROLES.constantPost && (
				<Settings
					Component={SettingsConstantForm}
					componentProps={{ title }}
					iconClassname={iconClassname}
					type='constant'
					data={data}
				/>
			)}
		</div>
	)
}
