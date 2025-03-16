'use client'

import classNames from 'classnames'
import styles from './slider.module.scss'

import { MainSlider } from '@/api/main-slider/main-slider.api'
import { SettingsMainSliderForm } from '@/components/settings/main-slider/main-slider-form'
import { SettingsMainSlider } from '@/components/settings/main-slider/main-slider-link'
import { GeneralProps } from '@/utils/types'
import Image from 'next/image'
import { useState } from 'react'
import { AddItem } from '../settings/add/add-item'

type Props = {
	data: MainSlider[]
	generalProps: GeneralProps
}

export const Slider = ({ data, generalProps }: Props) => {
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
			<div className={styles.content}>
				{data.map((slider, index) => {
					return (
						<div
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
							/>
							<SettingsMainSlider
								data={slider}
								roles={generalProps.roles}
								iconClassname={styles.settings}
								theme='dark'
							/>
						</div>
					)
				})}
			</div>
			<button className={styles.rightToggle} onClick={nextSlide}>
				❯
			</button>
			<AddItem
				data={{
					id: '',
					order: 1,
				}}
				Component={SettingsMainSliderForm}
				type='main-slider'
				className={styles.addItem}
				postRole={generalProps.roles.mainSliderPost}
			/>
		</div>
	)
}
