'use client'

import styles from './slider.module.scss'

import Image from 'next/image'
import { useState } from 'react'

export const Slider = () => {
	const IMAGES_AMOUNT = 6

	const [
		{ firstImgIndex, secondImgIndex, isAbleToChangeSlide },
		setSliderData,
	] = useState({
		firstImgIndex: 0,
		secondImgIndex: 0,
		isAbleToChangeSlide: true,
	})

	const srcByIndex = (index: number) => {
		return `/pages/main/slider/${index}.png`
	}

	const changeSlide = (index: number) => {
		if (!isAbleToChangeSlide) return

		setSliderData(state => ({
			...state,
			secondImgIndex: index,
			isAbleToChangeSlide: false,
		}))

		const content = document.getElementsByClassName(
			styles.content
		)[0] as HTMLDivElement

		content.classList.add(styles.transition)

		setTimeout(() => {
			setSliderData({
				firstImgIndex: index,
				secondImgIndex: index,
				isAbleToChangeSlide: false,
			})

			setTimeout(() => {
				content.classList.remove(styles.transition)

				setSliderData({
					firstImgIndex: index,
					secondImgIndex: index,
					isAbleToChangeSlide: true,
				})
			}, 100)
		}, 700)
	}

	const prevSlide = () => {
		changeSlide(firstImgIndex === 0 ? IMAGES_AMOUNT - 1 : firstImgIndex - 1)
	}

	const nextSlide = () => {
		changeSlide(firstImgIndex === IMAGES_AMOUNT - 1 ? 0 : firstImgIndex + 1)
	}

	return (
		<div className={styles.slider}>
			<button className={styles.leftToggle} onClick={prevSlide}>
				❮
			</button>
			<div className={styles.content}>
				<Image
					width={600}
					height={1}
					src={srcByIndex(firstImgIndex)}
					alt={`Slide ${firstImgIndex + 1}`}
					className={styles.firstImg}
				/>
				<Image
					width={600}
					height={1}
					src={srcByIndex(secondImgIndex)}
					alt={`Slide ${secondImgIndex + 1}`}
					className={styles.secondImg}
				/>
			</div>
			<button className={styles.rightToggle} onClick={nextSlide}>
				❯
			</button>
		</div>
	)
}
