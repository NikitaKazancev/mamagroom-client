import classNames from 'classnames'
import { MdLogout } from 'react-icons/md'
import styles from './logout.module.scss'

export const LogoutIcon = ({
	className,
	onClick,
}: {
	className?: string
	onClick: () => void
}) => {
	return (
		<MdLogout
			className={classNames(styles.icon, className)}
			onClick={onClick}
		/>
	)
}
