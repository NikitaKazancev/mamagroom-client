import { LINKS } from '@/constants/links.constants'
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
			<iframe src={LINKS.yandex.reviews}></iframe>
			<Link
				href={LINKS.yandex.map}
				target='_blank'
				className={styles.reviewsMap}
			>
				{t('onMap')}
			</Link>
		</div>
	)
}
