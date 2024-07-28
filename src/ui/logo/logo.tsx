import { HOME } from '@/constants/pages.constants'
import classNames from 'classnames'
import Link from 'next/link'
import styles from './logo.module.scss'

type Props = {
	theme: 'light' | 'dark'
	className?: string
	link?: string
	targetBlank?: boolean
}

export const Logo = ({ theme, className, link, targetBlank }: Props) => {
	const clazzName = classNames(styles.logo, styles[theme], className)

	return (
		<Link
			href={link || HOME.path}
			target={targetBlank ? '_blank' : '_self'}
			className={clazzName}
		>
			<div></div>
		</Link>
	)
}
