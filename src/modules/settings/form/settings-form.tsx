'use client'

import useSettingsStore from '@/modules/settings/utils/store'
import { Button } from '@/ui/button/button'
import { ExitIcon } from '@/ui/icons/exit/exit'
import classNames from 'classnames'
import { useRef } from 'react'
import styles from './settings-form.module.scss'

export const SettingsForm = () => {
	const { hide, isShown, Component, componentProps, onSubmit } =
		useSettingsStore()
	const form = useRef<HTMLFormElement>(null)

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		hide()
		onSubmit(new FormData(e.currentTarget))
	}

	return (
		<div className={classNames(styles.wrapper, !isShown && styles.hide)}>
			<div className={styles.main}>
				<div className={styles.header}>
					<h2 className={styles.title}>Вход</h2>
					<ExitIcon className={styles.exit} theme='dark' onClick={hide} />
				</div>
				<form onSubmit={handleSubmit} className={styles.form} ref={form}>
					{Component && <Component {...componentProps} />}
					<Button text='Сохранить' theme='dark' />
				</form>
			</div>
		</div>
	)
}
