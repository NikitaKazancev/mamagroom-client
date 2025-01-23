import classNames from 'classnames'
import styles from './button.module.scss'

interface Props {
	text?: string
	Icon?: React.ReactNode
	theme: 'dark' | 'light'
	className?: string
	onClick?: () => void
}

export const Button = ({ text, theme, className, onClick, Icon }: Props) => {
	const clazz = classNames(styles.button, {
		[styles.dark]: theme === 'dark',
		[styles.light]: theme === 'light',
		[className!]: !!className,
	})
	return (
		<button className={clazz} onClick={onClick}>
			{Icon ? Icon : text}
		</button>
	)
}
