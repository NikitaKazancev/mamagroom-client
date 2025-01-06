import { Input } from '@/ui/input/input'
import { SettingsForm } from '../settings/form/settings-form'

export const Auth = () => {
	async function post(formData: FormData) {
		'use server'
		// const value = formData.get('value')
		// if (!value) return

		// putConstant({
		// 	...data,
		// 	value: value.toString(),
		// })
	}

	return (
		<SettingsForm onSubmit={post}>
			<Input title={'E-mail'} name='email' required type='email' />
			<Input title={'Password'} name='password' required type='password' />
		</SettingsForm>
	)
}
