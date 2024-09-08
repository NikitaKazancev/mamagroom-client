'use client'

import { HeaderNavbarLink } from '@/api/header-navbar-link/header-navbar-link.types'
import { Navbar } from '@/components/navbar/navbar'
import { locales } from '@/i18n'
import { Link, usePathname } from '@/navigation'
import { Button } from '@/ui/button/button'
import { DropDown } from '@/ui/drop-down/drop-down'
import { TelegramIcon } from '@/ui/icons/telegram/telegram'
import { WhatsAppIcon } from '@/ui/icons/whatsapp/whatsapp'
import { WorldIcon } from '@/ui/icons/world/world'
import { Logo } from '@/ui/logo/logo'
import classNames from 'classnames'
import { useEffect, useState } from 'react'
import styles from './header.module.scss'

type Props = {
	navLinks: HeaderNavbarLink[]
	translations: {
		book: string
	}
}

export const Header = ({ navLinks, translations }: Props) => {
	const alwaysDark = usePathname() !== '/'
	const [isScrolled, setIsScrolled] = useState(alwaysDark)

	const handleScroll = () => {
		setIsScrolled(window.scrollY > window.innerHeight / 5)
	}

	useEffect(() => {
		setIsScrolled(alwaysDark)
		if (alwaysDark) return
		if ((window as any).listenerAdded) return

		window.addEventListener('scroll', handleScroll)
		;(window as any).listenerAdded = true
		handleScroll()

		return () => {
			document.body.removeEventListener('scroll', handleScroll)
			;(window as any).listenerAdded = false
		}
	}, [alwaysDark])

	const theme = isScrolled ? 'dark' : 'light'

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
						items={locales.map(locale => ({
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
					<Link href={'/'}>
						<Button text={translations.book} theme={theme} />
					</Link>
				</div>
			</div>
			<div className={styles.blurBlock}></div>
		</header>
	)
}
