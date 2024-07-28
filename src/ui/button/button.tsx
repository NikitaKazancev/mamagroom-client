import classNames from 'classnames'
import styles from './button.module.scss'

interface Props {
	text: string
	theme: 'dark' | 'light'
	className?: string
}

export const Button = ({ text, theme, className }: Props) => {
	const clazz = classNames(styles.button, {
		[styles.dark]: theme === 'dark',
		[styles.light]: theme === 'light',
		[className!]: !!className,
	})
	return <button className={clazz}>{text}</button>
}
