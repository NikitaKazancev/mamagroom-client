'use client'

import { Value } from '@/api/values/values.api'
import { SettingsValue } from '@/components/settings/values/values-link'
import { capitalizeFirst } from '@/utils/functions'
import classNames from 'classnames'
import Image from 'next/image'
import { useRef, useState } from 'react'
import { isSettingElem } from '../settings/settings'
import styles from './grid-list.module.scss'

type Item = {
	title: string
	description: string
	imageName: string
}

type Props = {
	content: Value[]
	className?: string
}

type Direction = 'left' | 'right' | 'top' | 'bottom'

const directionToAnimate = (from: number, to: number): Direction => {
	const fromMod = from % 3
	const toMod = to % 3

	if (toMod > fromMod) {
		return 'right'
	} else if (toMod < fromMod) {
		return 'left'
	} else if (to > from) {
		return 'bottom'
	} else {
		return 'top'
	}
}

const classForRotation = (direction: Direction) => {
	return styles[`rotate${capitalizeFirst(direction)}`]
}

export const GridList = ({ content, className }: Props) => {
	const [elemsState, setElemsState] = useState(
		content.map((_, i) => {
			const isFirstElem = i === 0

			return {
				isComponent1Title: !isFirstElem,
				isComponent2Title: isFirstElem,
				isComponent3Title: isFirstElem,
				isComponent4Title: isFirstElem,
				isComponent5Title: isFirstElem,
			}
		})
	)
	const [canBeChanged, setCanBeChanged] = useState(true)

	const ul = useRef<HTMLUListElement>(null)

	const activeItemIndex = () => {
		return elemsState.findIndex(({ isComponent1Title }) => !isComponent1Title)
	}

	const handleHover = (index: number, { target }: { target: EventTarget }) => {
		const elems = ul.current?.querySelectorAll('li')
		if (!elems) return

		if (isSettingElem(target as HTMLElement, styles.item)) return

		const activeIndex = activeItemIndex()

		let prevItem = undefined
		let nextItem = undefined
		for (let i = 0; i < elems.length; i++) {
			const li = elems[i]
			const dataIndex = li.getAttribute('data-index')

			if (dataIndex === activeIndex.toString()) {
				prevItem = li
			}

			if (dataIndex === index.toString()) {
				nextItem = li
			}
		}
		if (!prevItem || !nextItem || prevItem === nextItem) return

		if (!canBeChanged) return
		setCanBeChanged(false)

		for (let i = 0; i < elems.length; i++) {
			const li = elems[i]
			li.classList.remove(
				styles.rotateTop,
				styles.rotateBottom,
				styles.rotateRight,
				styles.rotateLeft,
				styles.prepareRotateY,
				styles.prepareRotateX,
				styles.onTop
			)
		}

		const direction = directionToAnimate(activeIndex, index)
		const classToRotate = classForRotation(direction)

		if (direction === 'bottom' || direction === 'top') {
			prevItem.classList.add(styles.prepareRotateY)
			nextItem.classList.add(styles.prepareRotateY)
		} else {
			prevItem.classList.add(styles.prepareRotateX)
			nextItem.classList.add(styles.prepareRotateX)
		}

		prevItem.classList.add(classToRotate)
		nextItem.classList.add(styles.onTop, classToRotate)

		setTimeout(() => {
			prevItem.classList.remove(styles.transition)
			nextItem.classList.remove(styles.transition)

			prevItem.classList.remove(
				styles.rotateTop,
				styles.rotateBottom,
				styles.rotateRight,
				styles.rotateLeft
			)
			nextItem.classList.remove(
				styles.rotateTop,
				styles.rotateBottom,
				styles.rotateRight,
				styles.rotateLeft
			)

			setElemsState(prev => {
				return prev.map((item, i) => {
					const isNewItem = i === index

					return {
						isComponent1Title: !isNewItem,
						isComponent2Title: isNewItem,
						isComponent3Title: isNewItem,
						isComponent4Title: isNewItem,
						isComponent5Title: isNewItem,
					}
				})
			})

			setTimeout(() => {
				prevItem.classList.add(styles.transition)
				nextItem.classList.add(styles.transition)
				setCanBeChanged(true)
			}, 20)
		}, 1000)
	}

	return (
		<div className={styles.listWrapper}>
			<ul ref={ul} className={classNames(styles.main, className)}>
				{content.map((data, i) => {
					const elemState = elemsState[i]
					if (!elemState) return null

					return (
						<li
							className={classNames(styles.item, styles.transition)}
							onMouseMove={e => handleHover(i, e)}
							onMouseOver={e => handleHover(i, e)}
							data-index={i}
							key={data.title}
						>
							<Item
								{...data}
								showTitle={elemState.isComponent1Title}
								className={styles.wrapper1}
							/>
							<Item
								{...data}
								showTitle={elemState.isComponent2Title}
								className={styles.wrapper2}
							/>
							<Item
								{...data}
								showTitle={elemState.isComponent3Title}
								className={styles.wrapper3}
							/>
							<Item
								{...data}
								showTitle={elemState.isComponent4Title}
								className={styles.wrapper4}
							/>
							<Item
								{...data}
								showTitle={elemState.isComponent5Title}
								className={styles.wrapper5}
							/>
							<SettingsValue
								data={{ ...data }}
								iconClassname={styles.settings}
								theme='dark'
								formTitle='Изменение ценности'
							/>
						</li>
					)
				})}
			</ul>
		</div>
	)
}

const Item = ({
	title,
	description,
	imageName,
	showTitle,
	className,
}: Item & {
	showTitle: boolean
	className?: string
}) => {
	return (
		<article
			className={classNames(
				styles.wrapper,
				showTitle && styles.titleBlock,
				className
			)}
		>
			{showTitle ? (
				<h4 className={styles.title}>{title}</h4>
			) : (
				<>
					<p className={styles.description}>{description}</p>
					<Image
						src={imageName}
						alt={title}
						fill
						className={styles.img}
						sizes='400px'
					/>
				</>
			)}
		</article>
	)
}
