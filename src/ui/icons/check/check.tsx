import classNames from 'classnames'
import { FaCheck } from 'react-icons/fa'
import styles from './check.module.scss'

export const CheckIcon = ({
	className,
	onClick,
	theme = 'green',
}: {
	className?: string
	onClick?: () => void
	theme?: 'light' | 'dark' | 'green'
}) => {
	return (
		<FaCheck
			className={classNames(styles.icon, styles[theme], className)}
			onClick={() => onClick?.()}
		/>
	)
}
