'use client'

import { Navbar } from '@/components/navbar/navbar'
import { Button } from '@/ui/button/button'
import { TelegramIcon } from '@/ui/icons/telegram/telegram'
import { WhatsAppIcon } from '@/ui/icons/whatsapp/whatsapp'
import { Logo } from '@/ui/logo/logo'
import classNames from 'classnames'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import styles from './header.module.scss'

export const Header = () => {
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
				<Navbar theme={theme} />
				<div className={styles.rightSection}>
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
