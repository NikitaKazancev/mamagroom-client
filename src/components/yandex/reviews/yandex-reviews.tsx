import { YANDEX_IFRAME_REVIEWS, YANDEX_MAP } from '@/constants/yandex.constants'
import classNames from 'classnames'
import { useTranslations } from 'next-intl'
import Link from 'next/link'
import styles from './yandex-reviews.module.scss'

type Props = {
	className?: string
}

export const YandexReviews = ({ className }: Props) => {
	const t = useTranslations('Yandex')

	return (
		<div className={classNames(styles.reviews, className)}>
			<iframe src={YANDEX_IFRAME_REVIEWS}></iframe>
			<Link href={YANDEX_MAP} target='_blank' className={styles.reviewsMap}>
				{t('onMap')}
			</Link>
		</div>
	)
}
