'use client'

import classNames from 'classnames'
import { v4 as uuidv4 } from 'uuid'
import styles from './textarea.module.scss'

export const TextArea = ({
	title,
	required,
	name,
	value = '',
	onChange,
	theme = 'light',
}: {
	title: string
	name: string
	required?: boolean
	value?: string
	onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
	theme?: 'light' | 'dark'
}) => {
	const id = uuidv4()

	return (
		<div className={styles.wrapper}>
			<div className={classNames(styles.container, styles[theme])}>
				<textarea
					required={required}
					value={value}
					className={styles.input}
					name={name}
					onChange={onChange}
					autoComplete='on'
					id={id}
				/>
				<label htmlFor={id}>{title}</label>
			</div>
		</div>
	)
}
