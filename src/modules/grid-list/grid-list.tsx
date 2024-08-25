'use client'

import classNames from 'classnames'
import Image from 'next/image'
import { useRef, useState } from 'react'
import styles from './grid-list.module.scss'

type Item = {
	title: string
	description: string
	imageSrc: string
}

type Props = {
	content: Item[]
	className?: string
}

type Direction = 'left' | 'right' | 'top' | 'bottom'

export const GridList = ({ content, className }: Props) => {
	const [itemsState, setItemsState] = useState(
		content.map((item, i) => {
			if (i === 0) {
				return {
					isElem1Title: false,
					isElem2Title: true,
					isElem3Title: true,
					isElem4Title: true,
					isElem5Title: true,
				}
			}

			return {
				isElem1Title: true,
				isElem2Title: false,
				isElem3Title: false,
				isElem4Title: false,
				isElem5Title: false,
			}
		})
	)
	const elements = useRef<HTMLUListElement>(null)
	const [canBeChanged, setCanBeChanged] = useState(true)

	const directionToAnimate = (from: number, to: number): Direction => {
		if (from === 0) {
			if (to === 1) {
				return 'right'
			} else {
				return 'bottom'
			}
		}

		if (from === 1) {
			if (to === 0) {
				return 'left'
			} else if (to === 2) {
				return 'right'
			} else {
				return 'bottom'
			}
		}

		if (from === 2) {
			if (to === 1) {
				return 'left'
			} else {
				return 'bottom'
			}
		}

		if (from === 3) {
			if (to === 4) {
				return 'right'
			} else {
				return 'top'
			}
		}

		if (from === 4) {
			if (to === 3) {
				return 'left'
			} else if (to === 5) {
				return 'right'
			} else {
				return 'top'
			}
		}

		if (from === 5) {
			if (to === 4) {
				return 'left'
			} else {
				return 'top'
			}
		}

		return 'bottom'
	}

	const classForRotationByDirection = (direction: Direction) => {
		return styles[
			`rotate${direction.charAt(0).toUpperCase()}${direction.slice(1)}`
		]
	}

	const activeItemIndex = () => {
		return itemsState.findIndex(({ isElem1Title }) => !isElem1Title)
	}

	const handleHover = (index: number) => {
		const items = elements.current?.querySelectorAll('li')
		if (!items) return

		const activeIndex = activeItemIndex()

		let prevItem = undefined
		let nextItem = undefined
		for (let i = 0; i < items.length; i++) {
			const li = items[i]
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

		for (let i = 0; i < items.length; i++) {
			const li = items[i]
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
		const classForRotation = classForRotationByDirection(direction)

		if (direction === 'bottom' || direction === 'top') {
			prevItem.classList.add(styles.prepareRotateY)
			nextItem.classList.add(styles.prepareRotateY)
		} else {
			prevItem.classList.add(styles.prepareRotateX)
			nextItem.classList.add(styles.prepareRotateX)
		}

		prevItem.classList.add(classForRotation)
		nextItem.classList.add(styles.onTop, classForRotation)

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

			setItemsState(prev => {
				return prev.map((item, i) => {
					const isNewItem = i === index

					return {
						isElem1Title: !isNewItem,
						isElem2Title: isNewItem,
						isElem3Title: isNewItem,
						isElem4Title: isNewItem,
						isElem5Title: isNewItem,
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
		<div className={classNames(styles.main, className)}>
			<ul ref={elements}>
				{content.map((data, i) => {
					const itemState = itemsState[i]

					return (
						<li
							key={data.title}
							className={classNames(styles.item, styles.transition)}
							onMouseMove={() => handleHover(i)}
							onMouseOver={() => handleHover(i)}
							data-index={i}
						>
							<Item
								{...data}
								showTitle={itemState.isElem1Title}
								className={styles.wrapper1}
							/>
							<Item
								{...data}
								showTitle={itemState.isElem2Title}
								className={styles.wrapper2}
							/>
							<Item
								{...data}
								showTitle={itemState.isElem3Title}
								className={styles.wrapper3}
							/>
							<Item
								{...data}
								showTitle={itemState.isElem4Title}
								className={styles.wrapper4}
							/>
							<Item
								{...data}
								showTitle={itemState.isElem5Title}
								className={styles.wrapper5}
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
	imageSrc,
	showTitle,
	className,
}: Item & {
	showTitle: boolean
	className?: string
}) => {
	return (
		<div
			className={classNames(
				styles.wrapper,
				showTitle && styles.titleBlock,
				className
			)}
		>
			{showTitle ? (
				<h3 className={styles.title}>{title}</h3>
			) : (
				<>
					<p className={styles.description}>{description}</p>
					<Image
						src={imageSrc}
						alt={title}
						width={700}
						height={1}
						className={styles.img}
					/>
				</>
			)}
		</div>
	)
}
