import { HeaderNavbarLink } from '@/api/header-navbar-link/header-navbar-link.api'
import { DropDown } from '@/ui/drop-down/drop-down'
import { GeneralProps } from '@/utils/types'
import classNames from 'classnames'
import Link from 'next/link'
import { SettingsHeaderNavbarLink } from '../settings/header-navbar-link/settings-header-navbar-link'
import styles from './navbar.module.scss'

type Props = {
	theme: 'light' | 'dark'
	navLinks: HeaderNavbarLink[]
	generalProps: GeneralProps
}

export const Navbar = ({ theme, navLinks, generalProps }: Props) => {
	return (
		<nav className={classNames(styles.navbar, styles[theme])}>
			<ul className={styles.list}>
				{navLinks.map(data => {
					const { name, link, sublinks } = data
					if (!link && (!sublinks || !sublinks.length)) return null

					const contentWithSettings = (
						<SettingsHeaderNavbarLink
							data={{ ...data }}
							roles={generalProps.roles}
							iconClassname={styles.settings}
							theme={theme}
						>
							{link ? (
								<Link className={styles.hover} href={link}>
									{name}
								</Link>
							) : (
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
									className={styles.hover}
								/>
							)}
						</SettingsHeaderNavbarLink>
					)

					return (
						<li key={name} className={styles.item}>
							{link ? contentWithSettings : contentWithSettings}
						</li>
					)
				})}
			</ul>
		</nav>
	)
}
