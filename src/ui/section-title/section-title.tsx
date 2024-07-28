import classnames from 'classnames'
import styles from './section-title.module.scss'

type Props = {
	text: string
	color?: 'blue'
	className?: string
}

export const SectionTitle = ({ text, color, className }: Props) => {
	const clazzName = classnames(styles.sectionTitle, {
		[styles.blue]: color === 'blue',
		[className!]: !!className,
	})

	return (
		<div className={clazzName}>
			<h3 className={styles.title}>{text}</h3>
		</div>
	)
}
