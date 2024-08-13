import classNames from 'classnames'
import Link from 'next/link'
import styles from './navbar.module.scss'

type Props = {
	theme: 'light' | 'dark'
	navLinks: NavLink[]
}

export const Navbar = ({ theme, navLinks }: Props) => {
	const className = classNames(styles.navbar, styles[theme])

	return (
		<nav className={className}>
			<ul>
				{navLinks.map(({ name, link, sublinks }) => (
					<li key={name}>
						{sublinks || !link ? (
							<span>{name}</span>
						) : (
							<Link href={link}>{name}</Link>
						)}
					</li>
				))}
			</ul>
		</nav>
	)
}
