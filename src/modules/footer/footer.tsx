import { YandexMap } from '@/components/yandex/map/yandex-map'
import { EMAIL, PHONE, PHONE_REPRESENTATION } from '@/constants/links.constants'
import { YANDEX_MAP } from '@/constants/yandex.constants'
import { TelegramIcon } from '@/ui/icons/telegram/telegram'
import { WhatsAppIcon } from '@/ui/icons/whatsapp/whatsapp'
import { Layout } from '@/ui/layout/layout'
import { Logo } from '@/ui/logo/logo'
import Link from 'next/link'
import styles from './footer.module.scss'

export const Footer = () => {
	return (
		<footer className={styles.footer}>
			<Layout>
				<div className={styles.content}>
					<div className={styles.left}>
						<Logo
							link={YANDEX_MAP}
							theme='light'
							className={styles.logo}
							targetBlank
						/>
						<address>
							<Link href={YANDEX_MAP} target='_blank'>
								Мытищи, Новомытищинский проспект, 41к1
								<br />
								10:00 – 21:00
							</Link>
							<div className={styles.bottomLinks}>
								<Link href={`tel:${PHONE}`}>
									{PHONE_REPRESENTATION}
								</Link>
								<Link href={`mailto:${EMAIL}`}>{EMAIL}</Link>
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
					<p>© 2024. МамагруМ. Все права защищены.</p>
				</div>
			</Layout>
		</footer>
	)
}
