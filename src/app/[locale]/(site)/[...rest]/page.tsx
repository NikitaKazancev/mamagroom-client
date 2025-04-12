import { Button } from '@/ui/button/button'
import { Metadata } from 'next'
import { useTranslations } from 'next-intl'
import styles from './page.module.scss'

export async function generateMetadata({
	params,
}: {
	params: { locale: string }
}): Promise<Metadata> {
	return {
		robots: {
			index: false,
			follow: false,
			googleBot: {
				index: false,
				follow: false,
			},
		},
		title: 'Не найдено',
	}
}

export default function CatchAllPage() {
	const t = useTranslations('404')

	return (
		<div className={styles.main}>
			<section className={styles._404} id='_404'>
				<span className={styles.four}></span>
				<span className={styles.zero}></span>
				<span className={styles.four}></span>
			</section>
			<div className={styles.bottom}>
				<div className={styles.message}>{t('message')}</div>
				<Button theme='dark' text={t('linkText')} href={'/'} />
			</div>
		</div>
	)
}
