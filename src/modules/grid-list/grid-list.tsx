'use client'

import classNames from 'classnames'
import Image from 'next/image'
import { useRef, useState } from 'react'
import styles from './grid-list.module.scss'
import { capitalizeFirst } from '@/utils/functions'

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

	const activeItemIndex = () => {
		return elemsState.findIndex(({ isComponent1Title }) => !isComponent1Title)
	}

	const handleHover = (index: number) => {
		const elems = ul.current?.querySelectorAll('li')
		if (!elems) return

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
		<div className={classNames(styles.main, className)}>
			<ul ref={ul}>
				{content.map((data, i) => {
					const elemstate = elemsState[i]

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
								showTitle={elemstate.isComponent1Title}
								className={styles.wrapper1}
							/>
							<Item
								{...data}
								showTitle={elemstate.isComponent2Title}
								className={styles.wrapper2}
							/>
							<Item
								{...data}
								showTitle={elemstate.isComponent3Title}
								className={styles.wrapper3}
							/>
							<Item
								{...data}
								showTitle={elemstate.isComponent4Title}
								className={styles.wrapper4}
							/>
							<Item
								{...data}
								showTitle={elemstate.isComponent5Title}
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
