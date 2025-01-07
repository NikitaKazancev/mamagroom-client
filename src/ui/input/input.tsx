'use client'

import classNames from 'classnames'
import { HTMLInputTypeAttribute } from 'react'
import styles from './input.module.scss'

export const Input = ({
	title,
	required,
	name,
	value = '',
	type = 'text',
	onChange,
	theme = 'light',
	invisible = false,
}: {
	title: string
	name: string
	required?: boolean
	value?: string
	type?: HTMLInputTypeAttribute
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
	theme?: 'light' | 'dark'
	invisible?: boolean
}) => {
	const props: {
		required?: boolean
		type?: HTMLInputTypeAttribute
		name: string
		value?: string
		onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
	} = {
		required,
		type,
		name,
	}

	if (value) {
		props.value = value
	}
	if (onChange) {
		props.onChange = onChange
	}

	if (type === 'file') {
		return (
			<div className={styles.fileContainer}>
				<input type='file' name='file' />
			</div>
		)
	}

	return (
		<div className={classNames(styles.wrapper, invisible && styles.hide)}>
			<div className={classNames(styles.container, styles[theme])}>
				<input
					{...props}
					className={classNames(styles.input, value && styles.filled)}
				/>
				<label>{title}</label>
				<i></i>
			</div>
		</div>
	)
}
