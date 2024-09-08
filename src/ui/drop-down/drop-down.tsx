import useFullTransparentBlockStore from '@/components/full-transparent-block/utils/store'
import { Link } from '@/navigation'
import classNames from 'classnames'
import { useEffect, useState } from 'react'
import styles from './drop-down.module.scss'

type Props = {
	items: string[] | { title: string; href: string; locale?: string }[]
	onClick?: (
		event:
			| React.MouseEvent<HTMLLIElement, MouseEvent>
			| React.MouseEvent<HTMLAnchorElement, MouseEvent>
	) => void
	className?: string
	transparentValue?: boolean
	theme?: 'light' | 'dark'
	titleElement: JSX.Element | string
	direction?:
		| 'leftTop'
		| 'rightTop'
		| 'leftBottom'
		| 'rightBottom'
		| 'top'
		| 'bottom'
}

export const DropDown = ({
	items,
	onClick,
	className,
	transparentValue,
	theme,
	titleElement,
	direction,
}: Props) => {
	const {
		isShown: isShownTransparentBlock,
		hide,
		show,
	} = useFullTransparentBlockStore()
	const [isShown, setIsShown] = useState(false)

	useEffect(() => {
		if (!isShownTransparentBlock) {
			setIsShown(false)
		}
	}, [isShownTransparentBlock])

	const onToggle = () => {
		if (isShown) {
			hide()
		} else {
			show()
		}

		setIsShown(!isShown)
	}

	const onChoose = (
		event:
			| React.MouseEvent<HTMLLIElement, MouseEvent>
			| React.MouseEvent<HTMLAnchorElement, MouseEvent>
	) => {
		hide()
		setIsShown(false)

		if (onClick) {
			onClick(event)
		}
	}

	const itemsAreString = items.length && typeof items[0] === 'string'

	return (
		<div
			className={classNames(
				styles.main,
				className,
				transparentValue && styles.transparent,
				isShown && styles.isShown,
				styles[theme || 'light'],
				styles[direction || 'leftBottom']
			)}
		>
			<div onClick={onToggle}>{titleElement}</div>
			{itemsAreString ? (
				<ul className={styles.list}>
					{items.map((item, i) => {
						const title = item as string

						return (
							<li
								key={title}
								onClick={onChoose}
								className={classNames(
									styles.item,
									i < items.length - 1 && styles.separator
								)}
							>
								{title}
							</li>
						)
					})}
				</ul>
			) : (
				<div className={styles.list}>
					{items.map((item, i) => {
						const itemData = item as {
							title: string
							href: string
							locale?: string
						}

						return (
							<Link
								key={itemData.title}
								href={itemData.href}
								locale={itemData.locale}
								onClick={onChoose}
								className={classNames(
									styles.item,
									i < items.length - 1 && styles.separator
								)}
							>
								{itemData.title}
							</Link>
						)
					})}
				</div>
			)}
		</div>
	)
}
