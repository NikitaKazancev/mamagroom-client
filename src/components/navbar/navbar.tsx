import { NAV_LINKS } from '@/constants/pages.constants'
import classNames from 'classnames'
import Link from 'next/link'
import styles from './navbar.module.scss'

type Props = {
	theme: 'light' | 'dark'
}

export const Navbar = ({ theme }: Props) => {
	const className = classNames(styles.navbar, styles[theme])

	return (
		<nav className={className}>
			<ul>
				{NAV_LINKS.map(link => (
					<li key={link.path}>
						{link.sublinks ? (
							<span>{link.name}</span>
						) : (
							<Link href={link.path}>{link.name}</Link>
						)}
					</li>
				))}
			</ul>
		</nav>
	)
}
