'use client'

import classNames from 'classnames'
import { HTMLInputTypeAttribute, useRef } from 'react'
import { v4 as uuidv4 } from 'uuid'
import styles from './input.module.scss'

export const Input = ({
	title,
	required,
	name,
	value = '',
	type = 'text',
	onChange,
	theme = 'white',
	invisible = false,
	placeholder,
	className,
}: {
	title: string
	name: string
	required?: boolean
	value?: string | number | Date
	type?: HTMLInputTypeAttribute
	onChange?: (
		data:
			| React.ChangeEvent<HTMLInputElement>
			| { name: string; value: string | number }
	) => void
	theme?: 'white' | 'main'
	invisible?: boolean
	placeholder?: string
	className?: string
}) => {
	if (value instanceof Date) {
		value = value.toISOString().split('T')[0]
	}

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
		placeholder?: string
		className?: string
	} = {
		required,
		type,
		name,
		placeholder: placeholder
			? placeholder
			: !required
			? 'Не обязательно'
			: '',
		value,
		className,
	}

	const input = useRef<HTMLInputElement>(null)

	if (onChange) {
		props.onChange = onChange
	}

	if (type === 'file') {
		return (
			<div className={classNames(styles.fileContainer, className)}>
				<input type='file' name='file' required={required} />
			</div>
		)
	}

	let decreaseValue = undefined
	let increaseValue = undefined
	if (type === 'number') {
		const changeNumberValue = (value: number) => {
			if (!input.current || !onChange) return

			const currentValue = Number(input.current.value)
			if (currentValue <= 1 && value < 1) return

			onChange({
				name,
				value: currentValue + value,
			})
		}

		decreaseValue = () => changeNumberValue(-1)
		increaseValue = () => changeNumberValue(1)
	}

	const id = uuidv4()

	return (
		<div
			className={classNames(
				styles.container,
				styles[theme],
				invisible && styles.hide
			)}
		>
			<label htmlFor={id}>{title}</label>
			<input
				{...props}
				className={classNames(styles.input, value && styles.filled)}
				ref={input}
				autoComplete='on'
				id={id}
			/>
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
	)
}
