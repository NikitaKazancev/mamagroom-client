import styles from './select.module.scss'

type Props = {
	selectedOption: string
	handleChange: (event: React.ChangeEvent<HTMLSelectElement>) => void
	options: string[]
}

export const Select = ({ selectedOption, handleChange, options }: Props) => {
	return (
		<select
			id='mySelect'
			value={selectedOption}
			onChange={handleChange}
			className={styles.select}
		>
			<option value=''>--Choose a language--</option>
			{options.map(option => (
				<option key={option} value={option}>
					{option}
				</option>
			))}
		</select>
	)
}
