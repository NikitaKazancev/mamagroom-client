'use client'

import classNames from 'classnames'
import { TbSettings2 } from 'react-icons/tb'
import styles from './settings.module.scss'

export const SettingsIcon = ({
	className,
	onClick,
	theme = 'light',
}: {
	className?: string
	onClick?: () => void
	theme?: 'light' | 'dark'
}) => {
	return (
		<TbSettings2
			className={classNames(
				styles.icon,
				theme ? styles[theme] : '',
				className
			)}
			onClick={() => onClick?.()}
		/>
	)
}
