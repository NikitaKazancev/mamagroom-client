'use client'

import classNames from 'classnames'
import { HTMLInputTypeAttribute, useRef } from 'react'
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
	value?: string | number
	type?: HTMLInputTypeAttribute
	onChange?: (
		data:
			| React.ChangeEvent<HTMLInputElement>
			| { name: string; value: string | number }
	) => void
	theme?: 'light' | 'dark'
	invisible?: boolean
}) => {
	const props: {
		required?: boolean
		type?: HTMLInputTypeAttribute
		name: string
		value?: string | number
		onChange?: (
			data:
				| React.ChangeEvent<HTMLInputElement>
				| { name: string; value: string | number }
		) => void
	} = {
		required,
		type,
		name,
		value: value || '',
	}

	const input = useRef<HTMLInputElement>(null)

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

	let decreaseValue = undefined
	let increaseValue = undefined
	if (type === 'number') {
		const changeNumberValue = (value: number) => {
			if (!input.current || !onChange) return
			onChange({
				name,
				value: Number(input.current.value) + value,
			})
		}

		decreaseValue = () => changeNumberValue(-1)
		increaseValue = () => changeNumberValue(1)
	}

	return (
		<div className={classNames(styles.wrapper, invisible && styles.hide)}>
			<div className={classNames(styles.container, styles[theme])}>
				<input
					{...props}
					className={classNames(styles.input, value && styles.filled)}
					ref={input}
				/>
				<label>{title}</label>
				<i></i>
				{type === 'number' && (
					<div className={styles.numberControls}>
						<button
							type='button'
							className={styles.minus}
							onClick={decreaseValue}
						>
							-
						</button>
						<button
							type='button'
							className={styles.plus}
							onClick={increaseValue}
						>
							+
						</button>
					</div>
				)}
			</div>
		</div>
	)
}
