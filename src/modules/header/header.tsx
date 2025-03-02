'use client'

import { HeaderNavbarLink } from '@/api/header-navbar-link/header-navbar-link.api'
import { Navbar } from '@/components/navbar/navbar'
import { routing } from '@/i18n/routing'
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

export const Header = ({ navLinks, translations, generalProps }: Props) => {
	const [isScrolled, setIsScrolled] = useState(false)

	const handleScroll = () => {
		setIsScrolled(window.scrollY > window.innerHeight / 5)
	}

	useEffect(() => {
		if ((window as any).listenerAdded) return

		window.addEventListener('scroll', handleScroll)
		;(window as any).listenerAdded = true
		handleScroll()

		return () => {
			document.body.removeEventListener('scroll', handleScroll)
			;(window as any).listenerAdded = false
		}
	}, [])

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
