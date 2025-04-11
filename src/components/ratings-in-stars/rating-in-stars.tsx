import { StarIcon } from '@/ui/icons/star/star'
import styles from './rating-in-stars.module.scss'

export const RatingInStars = ({ rating }: { rating: number | string }) => {
	rating = Math.ceil(Number(rating))

	let ratingElem = null
	for (let i = 1; i <= 5; i++) {
		ratingElem = (
			<>
				{ratingElem}
				<StarIcon fill={rating >= i} />
			</>
		)
	}

	return <div className={styles.rating}>{ratingElem}</div>
}
