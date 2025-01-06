'use client'

import classNames from 'classnames'
import styles from './input.module.scss'

export const Input = ({
	title,
	required,
	name,
	value = '',
	type = 'text',
	onChange,
}: {
	title: string
	name: string
	required?: boolean
	value?: string
	type?: string
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}) => {
	return (
		<div className={styles.wrapper}>
			<div className={styles.inputbox}>
				<input
					required={required}
					type={type}
					value={value}
					className={classNames(styles.input, value && styles.filled)}
					name={name}
					onChange={onChange}
				/>
				<span>{title}</span>
				<i></i>
			</div>
		</div>
	)
}
