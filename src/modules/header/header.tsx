'use client'

import { HeaderNavbarLink } from '@/api/header-navbar-link/header-navbar-link.api'
import { Navbar } from '@/components/navbar/navbar'
import { routing, usePathname } from '@/i18n/routing'
import { Button } from '@/ui/button/button'
import { DropDown } from '@/ui/drop-down/drop-down'
import { TelegramIcon } from '@/ui/icons/telegram/telegram'
import { WhatsAppIcon } from '@/ui/icons/whatsapp/whatsapp'
import { WorldIcon } from '@/ui/icons/world/world'
import { Logo } from '@/ui/logo/logo'
import classNames from 'classnames'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
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

	return (
		<header
			className={classNames(styles.header, styles.blur, {
				[styles.isScrolled]: isScrolled,
			})}
		>
			<div className={styles.content}>
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
						onClick={message}
					/>
				</div>
			</div>
			<div className={styles.blurBlock}></div>
		</header>
	)
}
