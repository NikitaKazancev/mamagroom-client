'use client'

import { HeaderNavbarLink } from '@/api/header-navbar-link/header-navbar-link.api'
import { Navbar } from '@/components/navbar/navbar'
import { LINKS } from '@/constants/links.constants'
import { Link, routing, usePathname } from '@/i18n/routing'
import { Button } from '@/ui/button/button'
import { DropDown } from '@/ui/drop-down/drop-down'
import { TelegramIcon } from '@/ui/icons/telegram/telegram'
import { WhatsAppIcon } from '@/ui/icons/whatsapp/whatsapp'
import { WorldIcon } from '@/ui/icons/world/world'
import { Logo } from '@/ui/logo/logo'
import classNames from 'classnames'
import { useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast'
import { isSettingElem } from '../settings/settings'
import styles from './header.module.scss'

type Props = {
	translations: {
		book: string
	}
	navLinks: HeaderNavbarLink[]
}

const hasFirstState = (pathname: string, isNotFound: boolean) => {
	if (isNotFound) return false
	if (pathname.includes('/users')) return false
	return true
}

export const Header = ({ translations, navLinks }: Props) => {
	const pathname = usePathname()
	const [isScrolled, setIsScrolled] = useState(!hasFirstState(pathname, false))
	const [isMenuOpen, setIsMenuOpen] = useState(false)
	const burgerBg = useRef<HTMLDivElement>(null)

	useEffect(() => {
		const isNotFound = document.getElementById('_404') !== null
		const initialIsScrolled = !hasFirstState(pathname, isNotFound)
		setIsScrolled(prev =>
			prev !== initialIsScrolled ? initialIsScrolled : prev
		)

		const handleScroll = () => {
			if (!hasFirstState(pathname, isNotFound)) {
				setIsScrolled(prev => (prev ? prev : true))
				return
			}

			const newIsScrolled = window.scrollY > window.innerHeight / 5
			setIsScrolled(prev => (prev !== newIsScrolled ? newIsScrolled : prev))
		}

		window.addEventListener('scroll', handleScroll)
		handleScroll()

		return () => {
			window.removeEventListener('scroll', handleScroll)
		}
	}, [pathname])

	const theme = isScrolled ? 'dark' : 'light'

	const message = () => {
		toast.success('test', {
			duration: Infinity,
		})
	}

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

	return (
		<header
			className={classNames(styles.header, styles.blur, styles[theme], {
				[styles.isScrolled]: isScrolled,
			})}
		>
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
						href={LINKS.dikidi.generalBook}
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
							href={LINKS.dikidi.generalBook}
						/>
					</div>
				</div>
			</div>
			<div className={styles.blurBlock}></div>
		</header>
	)
}
