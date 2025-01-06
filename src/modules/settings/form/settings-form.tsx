'use client'

import { putConstant } from '@/api/constant/constant.server'
import { Button } from '@/ui/button/button'
import { ExitIcon } from '@/ui/icons/exit/exit'
import classNames from 'classnames'
import { useRef } from 'react'
import useSettingsStore from '../utils/store'
import styles from './settings-form.module.scss'

export const SettingsForm = () => {
	const { hide, isShown, componentProps, type, Component, data, setData } =
		useSettingsStore()

	const form = useRef<HTMLFormElement>(null)

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		hide()

		const formData = new FormData(e.currentTarget)
		if (type === 'constant') {
			putConstant(formData, data)
		}
	}

	return (
		<div className={classNames(styles.wrapper, !isShown && styles.hide)}>
			<div className={styles.main}>
				<div className={styles.header}>
					<h2 className={styles.title}>Вход</h2>
					<ExitIcon className={styles.exit} theme='dark' onClick={hide} />
				</div>
				<form onSubmit={handleSubmit} className={styles.form} ref={form}>
					{Component && (
						<Component
							{...componentProps}
							data={data}
							setData={setData}
						/>
					)}
					<Button text='Сохранить' theme='dark' />
				</form>
			</div>
		</div>
	)
}
