import { putConstant } from '@/api/constant/constant.server'
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
	async function post(formData: FormData) {
		'use server'
		console.log(formData)

		const value = formData.get('value')
		if (!value) return

		if (!data) return
		putConstant({
			...data,
			value: value.toString(),
		})
	}

	return (
		<div className='relative'>
			{children}
			{ROLES.constantPost && (
				<Settings
					formComponent={SettingsConstantForm}
					componentProps={{ title, data }}
					onSubmit={post}
					iconClassname={iconClassname}
				/>
			)}
		</div>
	)
}
