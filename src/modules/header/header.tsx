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
import { GeneralProps } from '@/utils/types'
import classNames from 'classnames'
import { useEffect, useState } from 'react'
import styles from './header.module.scss'

type Props = {
	navLinks: HeaderNavbarLink[]
	translations: {
		book: string
	}
	generalProps: GeneralProps
}

const hasFirstState = (pathname: string) => {
	if (pathname.includes('/users')) return false
	return true
}

export const Header = ({ navLinks, translations, generalProps }: Props) => {
	const pathname = usePathname()
	const [isScrolled, setIsScrolled] = useState(!hasFirstState(pathname))

	useEffect(() => {
		const initialIsScrolled = !hasFirstState(pathname)
		setIsScrolled(prev =>
			prev !== initialIsScrolled ? initialIsScrolled : prev
		)

		const handleScroll = () => {
			if (!hasFirstState(pathname)) {
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

	return (
		<header
			className={classNames(styles.header, styles.blur, {
				[styles.isScrolled]: isScrolled,
			})}
		>
			<div className={styles.content}>
				<Logo theme={theme} />
				<Navbar
					theme={theme}
					navLinks={navLinks}
					generalProps={generalProps}
				/>
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
					<Button text={translations.book} theme={theme} />
				</div>
			</div>
			<div className={styles.blurBlock}></div>
		</header>
	)
}
