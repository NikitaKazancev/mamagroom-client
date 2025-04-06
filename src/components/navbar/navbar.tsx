import { HeaderNavbarLink } from '@/api/header-navbar-link/header-navbar-link.api'
import classNames from 'classnames'
import styles from './navbar.module.scss'
import { AddItem } from '@/modules/settings/add/add-item'
import { DropDown } from '@/ui/drop-down/drop-down'
import Link from 'next/link'
import { SettingsHeaderNavbarLink } from '../settings/header-navbar-link/settings-header-navbar-link'
import { SettingsHeaderNavbarLinkForm } from '../settings/header-navbar-link/settings-header-navbar-link-form'

type Props = {
	theme: 'light' | 'dark'
	navLinks: HeaderNavbarLink[]
}

export const Navbar = ({ theme, navLinks }: Props) => {
	return (
		<nav className={classNames(styles.navbar, styles[theme])}>
			<ul className={styles.list}>
				{navLinks.map(data => {
					const { name, link, sublinks } = data
					if (!link && (!sublinks || !sublinks.length)) return null

					const contentWithSettings = (
						<>
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
							<SettingsHeaderNavbarLink
								data={{ ...data }}
								iconClassname={styles.settings}
								theme={theme}
								headerNavbarLinks={navLinks}
								formTitle='Изменение ссылки'
							/>
						</>
					)

					return (
						<li key={name} className={styles.item}>
							{link ? contentWithSettings : contentWithSettings}
						</li>
					)
				})}
			</ul>
			<AddItem
				Component={SettingsHeaderNavbarLinkForm}
				type='header-navbar-link'
				data={{
					id: '',
					name: '',
					link: '/',
					parentLinkId: '',
				}}
				headerNavbarLinks={navLinks}
				formTitle='Добавление ссылки'
			/>
		</nav>
	)
}
