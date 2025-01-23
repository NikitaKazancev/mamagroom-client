'use client'

import { AuthDto } from '@/api/auth/auth.api'
import { Input } from '@/ui/input/input'
import ReCAPTCHA from 'react-google-recaptcha'
import { SettingFormSetData, SettingsFormData } from '../settings/utils/store'
import styles from './auth-form.module.scss'

export const AuthForm = ({
	data,
	setData,
}: {
	data: SettingsFormData
	setData: SettingFormSetData
}) => {
	if (!data) {
		data = {
			email: '',
			password: '',
		}
	}
	const localData = data as AuthDto

	const onChange = (e: any) => {
		setData({ ...localData, [e.target.name]: e.target.value })
	}

	return (
		<>
			<Input
				name='email'
				onChange={onChange}
				title='Email'
				required
				type='email'
				value={localData.email}
			/>
			<Input
				name='password'
				onChange={onChange}
				title='Password'
				required
				type='password'
				value={localData.password}
			/>
			<ReCAPTCHA
				size='normal'
				sitekey={process.env.NEXT_PUBLIC_GOOGLE_RECAPTCHA_KEY as string}
				theme='light'
				className={styles.recaptcha}
			/>
		</>
	)
}
