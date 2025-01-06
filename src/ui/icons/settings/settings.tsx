'use client'

import classNames from 'classnames'
import { TbSettings2 } from 'react-icons/tb'
import styles from './settings.module.scss'

export const SettingsIcon = ({
	className,
	onClick,
}: {
	className?: string
	onClick?: () => void
}) => {
	return (
		<TbSettings2
			className={classNames(styles.icon, className)}
			onClick={() => onClick?.()}
		/>
	)
}
