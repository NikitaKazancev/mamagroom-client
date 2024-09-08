import { HOME } from '@/constants/pages.constants'
import { Link as LinkLocale } from '@/navigation'
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

	if (targetBlank) {
		return (
			<Link href={link || HOME.link} target='_blank' className={clazzName}>
				<div></div>
			</Link>
		)
	}

	return (
		<LinkLocale href={link || HOME.link} className={clazzName}>
			<div></div>
		</LinkLocale>
	)
}
