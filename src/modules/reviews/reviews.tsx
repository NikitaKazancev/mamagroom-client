import { constantApi } from '@/api/constant/constant.api'
import { reviewApi } from '@/api/review/review.api'
import { RatingInStars } from '@/components/ratings-in-stars/rating-in-stars'
import { SettingsConstant } from '@/components/settings/constant/settings-constant'
import { SettingsReviewForm } from '@/components/settings/review/review-form'
import { SettingsReview } from '@/components/settings/review/review-link'
import { LINKS } from '@/constants/links.constants'
import {
	getTranslation,
	useLanguage,
	useRoles,
} from '@/context/my-server-context'
import { Button } from '@/ui/button/button'
import { YandexMapsIcon } from '@/ui/icons/yandex-maps/yandex-maps'
import { Layout } from '@/ui/layout/layout'
import { SectionTitle } from '@/ui/section-title/section-title'
import { Section } from '@/ui/section/section'
import { capitalizeFirst, compactText, wordByAmount } from '@/utils/functions'
import classNames from 'classnames'
import Link from 'next/link'
import { AddItem } from '../settings/add/add-item'
import styles from './reviews.module.scss'

export const Reviews = async () => {
	const constants = await constantApi.findMany({
		type: 'reviews',
	})
	const reviews = await reviewApi.findMany()
	const language = useLanguage()
	const t = await getTranslation('Yandex')
	const tGeneral = await getTranslation('General')
	const roles = useRoles()

	return (
		<Section>
			<Layout className={styles.main}>
				<SettingsConstant
					data={{
						type: 'reviews',
						name: 'title',
						value: constants.reviews_title,
					}}
					title='Значение'
					iconClassname={styles.settings}
					type='constant_short'
					theme='dark'
					formTitle='Заголовок'
				>
					<SectionTitle text={constants.reviews_title} color='blue' />
				</SettingsConstant>
				{roles.constantPut && (
					<div className={styles.settingsBlock}>
						<SettingsConstant
							data={{
								type: 'reviews',
								name: 'rating',
								value: constants.reviews_rating,
							}}
							title='Значение'
							iconClassname={styles.settings}
							type='constant_short'
							theme='dark'
							formTitle='Общий рейтинг'
						>
							<></>
						</SettingsConstant>
						<SettingsConstant
							data={{
								type: 'reviews',
								name: 'amount',
								value: constants.reviews_amount,
							}}
							title='Значение'
							iconClassname={styles.settings}
							type='constant_short'
							theme='dark'
							formTitle='Общее количество'
						>
							<></>
						</SettingsConstant>
						<SettingsConstant
							data={{
								type: 'reviews',
								name: 'personal-rating',
								value: constants.reviews_personalRating,
							}}
							title='Значение'
							iconClassname={styles.settings}
							type='constant_short'
							theme='dark'
							formTitle='Рейтинг персонала'
						>
							<></>
						</SettingsConstant>
						<SettingsConstant
							data={{
								type: 'reviews',
								name: 'personal-amount',
								value: constants.reviews_personalAmount,
							}}
							title='Значение'
							iconClassname={styles.settings}
							type='constant_short'
							theme='dark'
							formTitle='Отзывов персонала'
						>
							<></>
						</SettingsConstant>
						<SettingsConstant
							data={{
								type: 'reviews',
								name: 'clean-rating',
								value: constants.reviews_cleanRating,
							}}
							title='Значение'
							iconClassname={styles.settings}
							type='constant_short'
							theme='dark'
							formTitle='Рейтинг чистоты'
						>
							<></>
						</SettingsConstant>
						<SettingsConstant
							data={{
								type: 'reviews',
								name: 'clean-amount',
								value: constants.reviews_cleanAmount,
							}}
							title='Значение'
							iconClassname={styles.settings}
							type='constant_short'
							theme='dark'
							formTitle='Отзывов чистоты'
						>
							<></>
						</SettingsConstant>
					</div>
				)}
				<Link
					className={styles.yandex}
					href={LINKS.yandex.map}
					target='_blank'
				>
					<div
						className={classNames(
							styles.ratingBlock,
							styles.generalRating
						)}
					>
						<div className={styles.top}>
							<YandexMapsIcon />
							<span>{constants.reviews_rating}</span>
							<RatingInStars rating={constants.reviews_rating} />
						</div>
						<span className={styles.bottom}>{`${
							constants.reviews_amount
						} ${wordByAmount(
							Number(constants.reviews_amount),
							t('reviewWord')
						)} ${t('generalRating')}`}</span>
					</div>
					<div
						className={classNames(
							styles.ratingBlock,
							styles.personalRating
						)}
					>
						<div className={styles.top}>
							<span>{t('personalRating')}</span>
							<span className={styles.rating}>
								{Number(constants.reviews_personalRating) * 100}%
							</span>
						</div>
						<span className={styles.bottom}>{`${
							constants.reviews_personalAmount
						} ${wordByAmount(
							Number(constants.reviews_personalAmount),
							t('reviewWord')
						)}`}</span>
					</div>
					<div
						className={classNames(styles.ratingBlock, styles.cleanRating)}
					>
						<div className={styles.top}>
							<span>{t('cleanRating')}</span>
							<span className={styles.rating}>
								{Number(constants.reviews_cleanRating) * 100}%
							</span>
						</div>
						<span className={styles.bottom}>{`${
							constants.reviews_cleanAmount
						} ${wordByAmount(
							Number(constants.reviews_cleanAmount),
							t('reviewWord')
						)}`}</span>
					</div>
				</Link>
				<div className={styles.wrapper}>
					<div className={styles.container}>
						<ul className={styles.list}>
							{reviews.map(review => {
								const formattedDate = new Date(
									review.date
								).toLocaleDateString(language, {
									day: 'numeric',
									month: 'long',
								})

								return (
									<li key={review.id} className={styles.item}>
										<h4 className={styles.title}>{review.name}</h4>
										<div className={styles.dateAndRating}>
											<RatingInStars rating={review.rating} />
											<span className={styles.date}>
												{formattedDate}
											</span>
										</div>
										<p className={styles.description}>
											{compactText(review.description, 255)}
										</p>
										<SettingsReview
											data={{
												...review,
												date: new Date(review.date),
											}}
											iconClassname={styles.settings}
											theme='dark'
											formTitle={'Изменение отзыва'}
										/>
									</li>
								)
							})}
							<li className={styles.btnItem}>
								<Button
									theme='dark'
									text={capitalizeFirst(tGeneral('more'))}
									className={styles.btn}
									href={LINKS.yandex.map}
									isExternalLink
								/>
							</li>
						</ul>
					</div>
				</div>
				<AddItem
					data={{
						id: '',
						rating: 5,
						date: new Date(),
					}}
					type='review'
					Component={SettingsReviewForm}
					className={styles.addItem}
					formTitle='Добавление отзыва'
				/>
			</Layout>
		</Section>
	)
}
