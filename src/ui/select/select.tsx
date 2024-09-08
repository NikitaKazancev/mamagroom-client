import useFullTransparentBlockStore from '@/components/full-transparent-block/utils/store'
import classNames from 'classnames'
import { useState } from 'react'
import styles from './select.module.scss'

type Props = {
	selectedOption: string
	onClick: (event: React.MouseEvent<HTMLLIElement, MouseEvent>) => void
	options: string[]
	className?: string
	transparentValue?: boolean
	theme?: 'light' | 'dark'
	direction?:
		| 'leftTop'
		| 'rightTop'
		| 'leftBottom'
		| 'rightBottom'
		| 'top'
		| 'bottom'
}

export const Select = ({
	selectedOption,
	onClick,
	options,
	className,
	transparentValue,
	theme,
	direction,
}: Props) => {
	const { hide, show } = useFullTransparentBlockStore()
	const [isShown, setIsShown] = useState(false)

	const onToggle = () => {
		if (isShown) {
			hide()
		} else {
			show()
		}

		setIsShown(!isShown)
	}

	const onChoose = (event: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
		hide()
		setIsShown(false)
		onClick(event)
	}

	return (
		<div
			className={classNames(
				styles.select,
				className,
				transparentValue && styles.transparent,
				isShown && styles.isShown,
				styles[theme || 'light'],
				styles[direction || 'rightBottom']
			)}
		>
			<div className={styles.selected} onClick={onToggle}>
				{selectedOption}
			</div>
			<ul className={styles.options}>
				{options.map((option, i) => (
					<li
						key={option}
						onClick={onChoose}
						className={classNames(
							styles.item,
							i < options.length - 1 && styles.separator
						)}
					>
						{option}
					</li>
				))}
			</ul>
		</div>
	)
}
