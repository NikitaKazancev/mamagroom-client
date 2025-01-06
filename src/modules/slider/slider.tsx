'use client'

import styles from './slider.module.scss'

import Image from 'next/image'
import { useState } from 'react'

export const Slider = ({ urls }: { urls: string[] }) => {
	const [activeSlideIndex, setActiveSlideIndex] = useState(0)

	const prevSlide = () => {
		setActiveSlideIndex(
			activeSlideIndex === 0 ? urls.length - 1 : activeSlideIndex - 1
		)
	}

	const nextSlide = () => {
		setActiveSlideIndex(
			activeSlideIndex === urls.length - 1 ? 0 : activeSlideIndex + 1
		)
	}

	return (
		<div className={styles.slider}>
			<button className={styles.leftToggle} onClick={prevSlide}>
				❮
			</button>
			<div className={styles.content}>
				{urls.map((url, index) => {
					return (
						<Image
							key={index}
							width={600}
							height={1}
							src={url}
							alt={`Slide ${index + 1}`}
							className={index === activeSlideIndex ? styles.active : ''}
						/>
					)
				})}
			</div>
			<button className={styles.rightToggle} onClick={nextSlide}>
				❯
			</button>
		</div>
	)
}
