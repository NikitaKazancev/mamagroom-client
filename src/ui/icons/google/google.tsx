import classNames from 'classnames'
import { FaGoogle } from 'react-icons/fa'
import styles from './google.module.scss'

export const GoogleIcon = ({
	className,
	onClick,
}: {
	className?: string
	onClick?: () => void
}) => {
	return (
		<FaGoogle
			className={classNames(styles.icon, className)}
			onClick={onClick}
		/>
	)
}
