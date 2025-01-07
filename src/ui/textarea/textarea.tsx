'use client'

import classNames from 'classnames'
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
	return (
		<div className={styles.wrapper}>
			<div className={classNames(styles.container, styles[theme])}>
				<textarea
					required={required}
					value={value}
					className={styles.input}
					name={name}
					onChange={onChange}
				/>
				<span>{title}</span>
			</div>
		</div>
	)
}
