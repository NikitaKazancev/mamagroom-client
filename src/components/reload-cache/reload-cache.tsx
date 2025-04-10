'use client'

import { ReloadIcon } from '@/ui/icons/reload/reload'
import classNames from 'classnames'
import styles from './reload-cache.module.scss'
import { revalidateAllTags } from '@/api/request-server'

type Props = {
	className?: string
	theme?: 'light' | 'dark'
}

export const ReloadCache = ({ className, theme }: Props) => {
	return (
		<ReloadIcon
			onClick={revalidateAllTags}
			className={classNames(styles.main, className)}
			theme={theme}
		/>
	)
}
