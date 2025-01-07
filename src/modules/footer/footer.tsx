import { Logout } from '@/components/logout/logout'
import { YandexMap } from '@/components/yandex/map/yandex-map'
import { LINKS } from '@/constants/links.constants'
import { TelegramIcon } from '@/ui/icons/telegram/telegram'
import { WhatsAppIcon } from '@/ui/icons/whatsapp/whatsapp'
import { Layout } from '@/ui/layout/layout'
import { Logo } from '@/ui/logo/logo'
import { formatPhoneNumber } from '@/utils/functions'
import { useTranslations } from 'next-intl'
import Link from 'next/link'
import { AuthForm } from '../auth/auth-form'
import { Settings } from '../settings/settings'
import styles from './footer.module.scss'

export const Footer = ({ token }: { token?: string }) => {
	const t = useTranslations('Footer')

	return (
		<footer className={styles.footer}>
			<Layout>
				<div className={styles.content}>
					<div className={styles.left}>
						<Logo
							link={LINKS.yandex.map}
							theme='light'
							className={styles.logo}
							targetBlank
						/>
						<address>
							<Link href={LINKS.yandex.map} target='_blank'>
								{t('address')}
								<br />
								{t('workingHours')}
							</Link>
							<div className={styles.bottomLinks}>
								<Link href={`tel:${LINKS.foreign.phone}`}>
									{formatPhoneNumber(LINKS.foreign.phone)}
								</Link>
								<Link href={`mailto:${LINKS.foreign.email}`}>
									{LINKS.foreign.email}
								</Link>
								<div className={styles.socialNetworks}>
									<TelegramIcon theme='light' />
									<WhatsAppIcon theme='light' />
								</div>
							</div>
						</address>
					</div>
					<div className={styles.right}>
						<YandexMap className={styles.map} />
					</div>
				</div>
				<div className={styles.bottom}>
					<p>{t('copyright')}</p>
				</div>
			</Layout>
			{token ? (
				<Logout className={styles.auth} />
			) : (
				<Settings
					Component={AuthForm}
					iconClassname={styles.auth}
					type='auth'
				/>
			)}
		</footer>
	)
}
