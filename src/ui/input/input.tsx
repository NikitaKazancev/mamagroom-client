'use client'

import classNames from 'classnames'
import { useState } from 'react'
import styles from './input.module.scss'

export const Input = ({
	title,
	required,
	name,
	initialValue = '',
	type = 'text',
}: {
	title: string
	name: string
	required?: boolean
	initialValue?: string
	type?: string
}) => {
	const [value, setValue] = useState(initialValue)

	return (
		<div className={styles.wrapper}>
			<div className={styles.inputbox}>
				<input
					required={required}
					type={type}
					value={value}
					onChange={e => setValue(e.target.value)}
					className={classNames(styles.input, value && styles.filled)}
					name={name}
				/>
				<span>{title}</span>
				<i></i>
			</div>
		</div>
	)
}
