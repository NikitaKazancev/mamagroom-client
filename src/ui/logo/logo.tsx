import { LINKS } from '@/constants/links.constants'
import { Link } from '@/i18n/routing'
import classNames from 'classnames'
import styles from './logo.module.scss'

type Props = {
	theme: 'light' | 'dark'
	className?: string
	link?: string
	targetBlank?: boolean
}

export const Logo = ({ theme, className, link, targetBlank }: Props) => {
	const clazzName = classNames(styles.logo, styles[theme], className)

	if (targetBlank) {
		return (
			<Link
				href={link || LINKS.pages.home}
				target='_blank'
				className={clazzName}
			>
				<div></div>
			</Link>
		)
	}

	return (
		<Link href={link || LINKS.pages.home} className={clazzName}>
			<div></div>
		</Link>
	)
}
