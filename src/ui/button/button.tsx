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
	isExternalLink?: boolean
	disabled?: boolean
}

export const Button = ({
	text,
	theme,
	className,
	onClick,
	Icon,
	href,
	isExternalLink,
	disabled,
}: Props) => {
	const clazz = classNames(styles.button, {
		[styles.dark]: theme === 'dark',
		[styles.light]: theme === 'light',
		[className!]: !!className,
	})

	if (href) {
		if (isExternalLink) {
			return (
				<Link href={href} className={clazz} target='_blank'>
					{Icon ? Icon : text}
				</Link>
			)
		}
		return (
			<Link href={href} className={clazz}>
				{Icon ? Icon : text}
			</Link>
		)
	}

	return (
		<button className={clazz} onClick={onClick} disabled={disabled}>
			{Icon ? Icon : text}
		</button>
	)
}
