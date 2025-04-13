'use client'

import { HeaderNavbarLink } from '@/api/header-navbar-link/header-navbar-link.api'
import { Navbar } from '@/components/navbar/navbar'
import { LINKS } from '@/constants/links.constants'
import { Link, routing } from '@/i18n/routing'
import { Button } from '@/ui/button/button'
import { DropDown } from '@/ui/drop-down/drop-down'
import { TelegramIcon } from '@/ui/icons/telegram/telegram'
import { WhatsAppIcon } from '@/ui/icons/whatsapp/whatsapp'
import { WorldIcon } from '@/ui/icons/world/world'
import { Logo } from '@/ui/logo/logo'
import classNames from 'classnames'
import { useRef, useState } from 'react'
import { isSettingElem } from '../settings/settings'
import styles from './header.module.scss'

type Props = {
	translations: {
		book: string
	}
	navLinks: HeaderNavbarLink[]
}

export const Header = ({ translations, navLinks }: Props) => {
	const [isMenuOpen, setIsMenuOpen] = useState(false)
	const burgerBg = useRef<HTMLDivElement>(null)

	const toggleMenu = (e: any) => {
		if (isSettingElem(e.target as HTMLElement, styles.navbar)) return

		if (isMenuOpen) {
			setTimeout(() => {
				burgerBg.current?.classList.add(styles.right)
			}, 300)
		} else {
			burgerBg.current?.classList.remove(styles.right)
		}

		setIsMenuOpen(prev => !prev)
	}

	const theme = 'dark'

	return (
		<header className={classNames(styles.header, styles.blur)} id='header'>
			<div className={styles.line}>
				<Logo theme={theme} />
				<Navbar theme={theme} navLinks={navLinks} />
				<div className={styles.rightSection}>
					<DropDown
						items={routing.locales.map(locale => ({
							title: locale,
							href: '/',
							locale,
						}))}
						transparentValue={true}
						theme={theme}
						titleElement={<WorldIcon theme={theme} />}
						direction='bottom'
					/>
					<TelegramIcon theme={theme} />
					<WhatsAppIcon theme={theme} />
					<Button
						text={translations.book}
						theme={theme}
						href={LINKS.dikidi.book}
						isExternalLink
					/>
				</div>
			</div>
			<div
				className={classNames(styles.burger, isMenuOpen && styles.active)}
			>
				<Logo theme={theme} className={styles.logo} />
				<div className={styles.burgerCheckbox} onClick={toggleMenu}>
					<span></span>
					<span></span>
					<span></span>
				</div>
				<div
					className={classNames(styles.burgerBg, styles.right)}
					ref={burgerBg}
					onClick={toggleMenu}
				>
					<div className={styles.burgerPanel}>
						<Navbar
							theme={'light'}
							navLinks={navLinks}
							className={styles.navbar}
						/>
						<div className={styles.links}>
							<div className={styles.langs}>
								{routing.locales.map(locale => (
									<Link href={'/'} key={locale} locale={locale}>
										{locale}
									</Link>
								))}
							</div>
							<TelegramIcon theme={'light'} />
							<WhatsAppIcon theme={'light'} />
						</div>
						<Button
							text={translations.book}
							theme={'light'}
							href={LINKS.dikidi.book}
							isExternalLink
						/>
					</div>
				</div>
			</div>
			<div className={styles.blurBlock}></div>
		</header>
	)
}
