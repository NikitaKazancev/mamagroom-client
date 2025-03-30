import { Link } from '@/i18n/routing'
import classNames from 'classnames'
import styles from './button.module.scss'

interface Props {
	text?: string
	Icon?: React.ReactNode
	theme: 'dark' | 'light'
	className?: string
	onClick?: () => void
	href?: string
}

export const Button = ({
	text,
	theme,
	className,
	onClick,
	Icon,
	href,
}: Props) => {
	const clazz = classNames(styles.button, {
		[styles.dark]: theme === 'dark',
		[styles.light]: theme === 'light',
		[className!]: !!className,
	})

	if (href) {
		return (
			<Link href={href} className={clazz}>
				{Icon ? Icon : text}
			</Link>
		)
	}

	return (
		<button className={clazz} onClick={onClick}>
			{Icon ? Icon : text}
		</button>
	)
}
