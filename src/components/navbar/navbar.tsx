import { HeaderNavbarLink } from '@/api/header-navbar-link/header-navbar-link.types'
import { Link } from '@/navigation'
import { DropDown } from '@/ui/drop-down/drop-down'
import classNames from 'classnames'
import styles from './navbar.module.scss'

type Props = {
	theme: 'light' | 'dark'
	navLinks: HeaderNavbarLink[]
}

export const Navbar = ({ theme, navLinks }: Props) => {
	const className = classNames(styles.navbar, styles[theme])

	return (
		<nav className={className}>
			<ul className={styles.list}>
				{navLinks.map(({ name, link, sublinks }) => (
					<li key={name} className={styles.item}>
						{link ? (
							<Link href={link}>{name}</Link>
						) : !sublinks ? null : (
							<DropDown
								items={sublinks
									.filter(({ link }) => !!link)
									.map(({ name, link }) => ({
										title: name,
										href: link as string,
									}))}
								titleElement={name}
								theme={theme}
								direction='bottom'
							/>
						)}
					</li>
				))}
			</ul>
		</nav>
	)
}
