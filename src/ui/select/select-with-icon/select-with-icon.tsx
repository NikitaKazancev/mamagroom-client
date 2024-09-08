import useFullTransparentBlockStore from '@/components/full-transparent-block/utils/store'
import { Link } from '@/navigation'
import classNames from 'classnames'
import styles from '../select.module.scss'

type Props = {
	onClick?: (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void
	options: { name: string; to: string; locale?: string }[]
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
	icon: JSX.Element
}

export const SelectWithIcon = ({
	options,
	onClick,
	className,
	transparentValue,
	theme,
	direction,
	icon,
}: Props) => {
	const { isShown, hide, show } = useFullTransparentBlockStore()

	const onToggle = () => {
		if (isShown) {
			hide()
		} else {
			show()
		}
	}

	const onChoose = (
		event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
	) => {
		hide()

		if (onClick) {
			onClick(event)
		}
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
			<div onClick={onToggle}>{icon}</div>
			<div className={styles.options}>
				{options.map(({ name, to, locale }, i) => (
					<Link
						href={to}
						key={name}
						className={classNames(
							styles.item,
							i < options.length - 1 && styles.separator
						)}
						locale={locale}
						onClick={onChoose}
					>
						{name}
					</Link>
				))}
			</div>
		</div>
	)
}
