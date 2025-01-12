'use client'

import { login } from '@/api/auth/auth.server'
import { putConstant } from '@/api/constant/constant.server'
import { ConstantDto } from '@/api/constant/constant.types'
import { postFile } from '@/api/file/file.server'
import { HeaderNavbarLinkDto } from '@/api/header-navbar-link/header-navbar-link.api'
import { putHeaderNavbarLink } from '@/api/header-navbar-link/header-navbar-link.server'
import { Button } from '@/ui/button/button'
import { ExitIcon } from '@/ui/icons/exit/exit'
import { setToken } from '@/utils/cookies/cookies-client.api'
import classNames from 'classnames'
import { useRef } from 'react'
import useSettingsStore from '../utils/store'
import styles from './settings-form.module.scss'

export const SettingsForm = () => {
	const { hide, isShown, componentProps, type, Component, data, setData } =
		useSettingsStore()

	const form = useRef<HTMLFormElement>(null)

	let formElems: {
		title: string
		buttonText: string
	} = { title: 'Настройки', buttonText: 'Сохранить' }

	if (type === 'auth') {
		formElems = { title: 'Авторизация', buttonText: 'Войти' }
	}

	const closeAndClearForm = () => {
		if (form.current) form.current.reset()
		hide()
	}

	const onWrapperClick = (e: React.MouseEvent<HTMLDivElement>) => {
		if (e.target === e.currentTarget) {
			closeAndClearForm()
		}
	}

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		const formData = new FormData(e.currentTarget)

		closeAndClearForm()

		if (type && type.startsWith('constant')) {
			putConstant(formData, data as ConstantDto)
		} else if (type === 'auth') {
			login(formData).then(token => {
				if (token) {
					setToken(token)
				}
			})
		} else if (type === 'file') {
			postFile(formData)
		} else if (type === 'header-navbar-link') {
			putHeaderNavbarLink(formData, data as HeaderNavbarLinkDto)
		}
	}

	return (
		<div
			className={classNames(styles.wrapper, !isShown && styles.hide)}
			onClick={onWrapperClick}
		>
			<div className={styles.main}>
				<div className={styles.header}>
					<h2 className={styles.title}>{formElems.title}</h2>
					<ExitIcon className={styles.exit} theme='dark' onClick={hide} />
				</div>
				<form onSubmit={handleSubmit} className={styles.form} ref={form}>
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
