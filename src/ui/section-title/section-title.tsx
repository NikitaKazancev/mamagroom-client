import classnames from 'classnames'
import styles from './section-title.module.scss'

type Props = {
	text: string
	color?: 'blue'
	className?: string
	id?: string
}

export const SectionTitle = ({ text, color, className, id }: Props) => {
	const clazzName = classnames(styles.sectionTitle, {
		[styles.blue]: color === 'blue',
		[className!]: !!className,
	})

	return (
		<div className={clazzName} id={id}>
			<h3 className={styles.title}>{text}</h3>
		</div>
	)
}
