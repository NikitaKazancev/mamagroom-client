import { HeaderNavbarLink } from '@/api/header-navbar-link/header-navbar-link.api'
import { Link } from '@/i18n/routing'
import { AddItem } from '@/modules/settings/add/add-item'
import { DropDown } from '@/ui/drop-down/drop-down'
import classNames from 'classnames'
import { Fragment } from 'react'
import { SettingsHeaderNavbarLink } from '../settings/header-navbar-link/settings-header-navbar-link'
import { SettingsHeaderNavbarLinkForm } from '../settings/header-navbar-link/settings-header-navbar-link-form'
import styles from './navbar.module.scss'

type Props = {
	theme: 'light' | 'dark'
	navLinks: HeaderNavbarLink[]
	className?: string
}

export const Navbar = ({ theme, navLinks, className }: Props) => {
	return (
		<nav
			className={classNames(styles.navbar, styles[theme], className)}
			role='navigation'
		>
			<ul className={styles.list}>
				{navLinks.map((data, index) => {
					const { name, link, sublinks } = data
					if (!link && (!sublinks || !sublinks.length)) return null

					return (
						<Fragment key={index}>
							{link ? (
								<li className={styles.item}>
									<Link className={styles.hover} href={link}>
										{name}
									</Link>
									<SettingsHeaderNavbarLink
										data={{ ...data }}
										iconClassname={styles.settings}
										theme={theme}
										headerNavbarLinks={navLinks}
										formTitle='Изменение ссылки'
									/>
								</li>
							) : (
								<>
									<li
										className={classNames(
											styles.item,
											styles.dropDown
										)}
									>
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
										<SettingsHeaderNavbarLink
											data={{ ...data }}
											iconClassname={styles.settings}
											theme={theme}
											headerNavbarLinks={navLinks}
											formTitle='Изменение ссылки'
										/>
									</li>
									{sublinks
										.filter(({ link }) => !!link)
										.map((data, index) => (
											<li
												key={index}
												className={classNames(
													styles.item,
													styles.shownSublink
												)}
											>
												<Link
													className={styles.hover}
													href={data.link as string}
												>
													{data.name}
												</Link>
												<SettingsHeaderNavbarLink
													data={{ ...data }}
													iconClassname={styles.settings}
													theme={theme}
													headerNavbarLinks={navLinks}
													formTitle='Изменение ссылки'
												/>
											</li>
										))}
								</>
							)}
						</Fragment>
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
				theme={theme}
				className={styles.addItem}
			/>
		</nav>
	)
}
