'use client'

import classNames from 'classnames'
import { TbReload } from 'react-icons/tb'
import styles from './reload.module.scss'

export const ReloadIcon = ({
	className,
	onClick,
	theme = 'dark',
}: {
	className?: string
	onClick?: () => void
	theme?: 'light' | 'dark'
}) => {
	return (
		<TbReload
			className={classNames(styles.icon, styles[theme], className)}
			onClick={() => onClick?.()}
		/>
	)
}
