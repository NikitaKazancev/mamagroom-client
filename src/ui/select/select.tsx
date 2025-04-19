import classNames from 'classnames'
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
	id: string
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
	id,
}: Props) => {
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
