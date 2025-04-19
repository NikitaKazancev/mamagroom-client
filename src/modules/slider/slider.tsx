'use client'

import classNames from 'classnames'
import styles from './slider.module.scss'

import { MainSlider } from '@/api/main-slider/main-slider.api'
import { SettingsMainSliderForm } from '@/components/settings/main-slider/main-slider-form'
import { SettingsMainSlider } from '@/components/settings/main-slider/main-slider-link'
import Image from 'next/image'
import { useState } from 'react'
import { AddItem } from '../settings/add/add-item'

type Props = {
	data: MainSlider[]
}

export const Slider = ({ data }: Props) => {
	const [activeSlideIndex, setActiveSlideIndex] = useState(0)

	const prevSlide = () => {
		setActiveSlideIndex(
			activeSlideIndex === 0 ? data.length - 1 : activeSlideIndex - 1
		)
	}
	const nextSlide = () => {
		setActiveSlideIndex(
			activeSlideIndex === data.length - 1 ? 0 : activeSlideIndex + 1
		)
	}

	return (
		<div className={styles.slider}>
			<button className={styles.leftToggle} onClick={prevSlide}>
				❮
			</button>
			<ul className={styles.content}>
				{data.map((slider, index) => {
					return (
						<li
							key={index}
							className={classNames(
								styles.slide,
								index === activeSlideIndex ? styles.active : ''
							)}
						>
							<Image
								fill
								src={slider.imageName}
								alt={`Slide ${index + 1}`}
								sizes='550px'
							/>
							<SettingsMainSlider
								data={slider}
								iconClassname={styles.settings}
								theme='dark'
								formTitle='Изменение слайда'
							/>
						</li>
					)
				})}
			</ul>
			<button className={styles.rightToggle} onClick={nextSlide}>
				❯
			</button>
			<AddItem
				data={{
					id: '',
				}}
				Component={SettingsMainSliderForm}
				type='main-slider'
				className={styles.addItem}
				formTitle='Добавление слайда'
			/>
		</div>
	)
}
