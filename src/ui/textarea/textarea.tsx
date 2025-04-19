import classNames from 'classnames'
import styles from './textarea.module.scss'

export const TextArea = ({
	title,
	required,
	name,
	value = '',
	onChange,
	theme = 'white',
	className,
	id,
}: {
	title: string
	name: string
	required?: boolean
	value?: string
	onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
	theme?: 'white' | 'main'
	className?: string
	id: string
}) => {
	return (
		<div className={classNames(styles.container, styles[theme], className)}>
			<label htmlFor={id}>{title}</label>
			<textarea
				required={required}
				value={value}
				className={styles.input}
				name={name}
				onChange={onChange}
				autoComplete='on'
				id={id}
				aria-label={title}
				aria-required={required}
			/>
		</div>
	)
}
