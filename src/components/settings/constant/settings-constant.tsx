import { ConstantDto } from '@/api/constant/constant.types'
import { Settings } from '@/modules/settings/settings'
import { SettingsFormType } from '@/modules/settings/utils/store'
import { Roles } from '@/utils/auth/auth'
import { SettingsConstantForm } from './settings-constant-form'

type Title =
	| 'Главный заголовок'
	| 'Главное описание'
	| 'Заголовок секции'
	| 'Описание секции'
	| 'Заголовок'
	| 'Описание'

export const SettingsConstant = ({
	children,
	title,
	data,
	iconClassname,
	type,
	roles,
}: {
	children: React.ReactNode
	title: Title
	data: ConstantDto
	iconClassname?: string
	type: SettingsFormType
	roles: Roles
}) => {
	return (
		<div className='relative'>
			{children}
			{roles.constantPost && (
				<Settings
					Component={SettingsConstantForm}
					componentProps={{ title }}
					iconClassname={iconClassname}
					type={type}
					data={data}
				/>
			)}
		</div>
	)
}
