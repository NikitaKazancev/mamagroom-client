'use client'

import { HeaderNavbarLink } from '@/api/header-navbar-link/header-navbar-link.types'
import { Navbar } from '@/components/navbar/navbar'
import { Language, locales } from '@/i18n'
import { Button } from '@/ui/button/button'
import { TelegramIcon } from '@/ui/icons/telegram/telegram'
import { WhatsAppIcon } from '@/ui/icons/whatsapp/whatsapp'
import { WorldIcon } from '@/ui/icons/world/world'
import { Logo } from '@/ui/logo/logo'
import { SelectWithIcon } from '@/ui/select/select-with-icon/select-with-icon'
import classNames from 'classnames'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import styles from './header.module.scss'

type Props = {
	language: Language
	navLinks: HeaderNavbarLink[]
}

export const Header = ({ language, navLinks }: Props) => {
	const [isScrolled, setIsScrolled] = useState(false)

	const handleScroll = () => {
		setIsScrolled(window.scrollY > window.innerHeight / 5)
	}

	useEffect(() => {
		window.addEventListener('scroll', handleScroll)
		handleScroll()

		return () => {
			window.removeEventListener('scroll', handleScroll)
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
				<Navbar theme={theme} navLinks={navLinks} />
				<div className={styles.rightSection}>
					<SelectWithIcon
						options={locales.map(locale => ({
							name: locale,
							to: '/',
							locale,
						}))}
						transparentValue={true}
						theme={theme}
						direction='bottom'
						icon={<WorldIcon theme={theme} />}
					/>
					<TelegramIcon theme={theme} />
					<WhatsAppIcon theme={theme} />
					<Link href={'/'}>
						<Button text='записаться' theme={theme} />
					</Link>
				</div>
			</div>
			<div className={styles.blurBlock}></div>
		</header>
	)
}
