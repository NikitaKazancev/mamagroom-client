import styles from './select.module.scss'

export const Select = () => {
	return (
		<div className={styles.main}>
			<select>
				<option value=''>Open this select menu</option>
				<option value='github'>GitHub</option>
				<option value='instagram'>Instagram</option>
				<option value='facebook'>Facebook</option>
				<option value='linkedin'>LinkedIn</option>
				<option value='twitter'>Twitter</option>
				<option value='reddit'>Reddit</option>
			</select>
		</div>
	)
}
