'use client'

import {
	VIDEO_CATS_PROCEDURES,
	VIDEO_DOGS_PROCEDURES,
} from '@/constants/video-links.constants'
import { Video } from '@/ui/video/video'
import classNames from 'classnames'
import { useState } from 'react'
import styles from './bar-changer-slider.module.scss'

type Props = {
	className?: string
}

const videos = [
	{
		title: 'для собак',
		src: VIDEO_DOGS_PROCEDURES,
	},
	{
		title: 'для кошек',
		src: VIDEO_CATS_PROCEDURES,
	},
]

export const BarChangerSlider = ({ className }: Props) => {
	const [activeSlide, setActiveSlide] = useState(0)

	return (
		<div className={classNames(styles.main, className)}>
			<ul className={styles.list}>
				{videos.map(({ src, title }, index) => (
					<li
						key={src}
						className={activeSlide === index ? styles.active : ''}
						onClick={() => setActiveSlide(index)}
					>
						<h4 className={styles.title}>{title}</h4>
						<Video src={src} className={styles.video} />
						{/* <div className={styles.item}>
						</div> */}
					</li>
				))}
			</ul>
		</div>
	)
}
