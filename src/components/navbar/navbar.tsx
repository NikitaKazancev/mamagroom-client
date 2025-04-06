import { HeaderNavbarLink } from '@/api/header-navbar-link/header-navbar-link.api'
import { AddItem } from '@/modules/settings/add/add-item'
import { DropDown } from '@/ui/drop-down/drop-down'
import classNames from 'classnames'
import Link from 'next/link'
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
				{navLinks.map(data => {
					const { name, link, sublinks } = data
					if (!link && (!sublinks || !sublinks.length)) return null

					return (
						<>
							{link ? (
								<li key={name} className={styles.item}>
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
										key={name}
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
										.map(data => (
											<li
												key={data.name}
												className={classNames(
													styles.item,
													styles.shownSublink
												)}
											>
												<Link
													className={styles.hover}
													href={data.link as string}
													key={data.link}
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
						</>
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
