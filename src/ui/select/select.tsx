import classNames from 'classnames'
import { v4 as uuidv4 } from 'uuid'
import styles from './select.module.scss'

type Props = {
	name: string
	title: string
	options: {
		name: string
		value: string
	}[]
	className?: string
	required?: boolean
	value?: string
	onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
}

export const Select = ({
	name,
	options,
	className,
	title,
	required,
	value = '',
	onChange,
}: Props) => {
	const id = uuidv4()

	return (
		<div className={classNames(styles.wrapper, className)}>
			<label htmlFor={id}>{title}</label>
			<select
				name={name}
				className={styles.select}
				id={id}
				required={required}
				value={value}
				onChange={onChange}
				aria-label={title}
				aria-required={required}
			>
				<option value=''>Выберите:</option>
				{options.map(({ name, value }) => (
					<option key={name} value={value}>
						{name}
					</option>
				))}
			</select>
		</div>
	)
}
