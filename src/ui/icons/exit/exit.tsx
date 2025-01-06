import classNames from 'classnames'
import { IoCloseSharp } from 'react-icons/io5'
import styles from './exit.module.scss'

export const ExitIcon = ({
	className,
	onClick,
	theme,
}: {
	className?: string
	onClick?: () => void
	theme: 'light' | 'dark'
}) => {
	return (
		<IoCloseSharp
			className={classNames(styles.icon, styles[theme], className)}
			onClick={() => onClick?.()}
		/>
	)
}
