'use client'

import { AuthDto } from '@/api/auth/auth.api'
import { login } from '@/api/auth/auth.server'
import { putConstant } from '@/api/constant/constant.server'
import { ConstantDto } from '@/api/constant/constant.types'
import { postFile } from '@/api/file/file.server'
import { Button } from '@/ui/button/button'
import { ExitIcon } from '@/ui/icons/exit/exit'
import { setToken } from '@/utils/cookies/cookies-client.api'
import classNames from 'classnames'
import useSettingsStore from '../utils/store'
import styles from './settings-form.module.scss'

export const SettingsForm = () => {
	const { hide, isShown, componentProps, type, Component, data, setData } =
		useSettingsStore()

	let formElems: {
		title: string
		buttonText: string
	} = { title: 'Настройки', buttonText: 'Сохранить' }

	if (type === 'auth') {
		formElems = { title: 'Авторизация', buttonText: 'Войти' }
	}

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		hide()

		const formData = new FormData(e.currentTarget)
		if (type && type.startsWith('constant')) {
			putConstant(formData, data as ConstantDto)
		} else if (type === 'auth') {
			login(formData, data as AuthDto).then(token => {
				if (token) {
					setToken(token)
				}
			})
		} else if (type === 'file') {
			console.log(formData.get('file'))

			postFile(formData)
		}
	}

	return (
		<div className={classNames(styles.wrapper, !isShown && styles.hide)}>
			<div className={styles.main}>
				<div className={styles.header}>
					<h2 className={styles.title}>{formElems.title}</h2>
					<ExitIcon className={styles.exit} theme='dark' onClick={hide} />
				</div>
				<form onSubmit={handleSubmit} className={styles.form}>
					{Component && (
						<Component
							{...componentProps}
							data={data}
							setData={setData}
							type={type}
						/>
					)}
					<Button text={formElems.buttonText} theme='dark' />
				</form>
			</div>
		</div>
	)
}
