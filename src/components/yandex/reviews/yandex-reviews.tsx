import {
	YANDEX_IFRAME_REVIEWS,
	YANDEX_MAP,
	YANDEX_REVIEWS_ADD,
	YANDEX_REVIEWS_MORE,
} from '@/constants/yandex.constants'
import { Button } from '@/ui/button/button'
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
			<Link
				href={YANDEX_REVIEWS_ADD}
				className={styles.addReview}
				target='_blank'
			>
				<Button text={t('leaveFeedback')} theme='dark' />
			</Link>
			<Link
				href={YANDEX_REVIEWS_MORE}
				className={styles.moreReviews}
				target='_blank'
			>
				<Button text={t('reviews')} theme='dark' />
			</Link>
			<Link href={YANDEX_MAP} target='_blank' className={styles.reviewsMap}>
				МамагруМ на карте Мытищ — Яндекс Карты
			</Link>
		</div>
	)
}
