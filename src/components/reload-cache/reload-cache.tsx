'use client'

import { revalidateAllTags } from '@/api/request-server'
import { ReloadIcon } from '@/ui/icons/reload/reload'
import classNames from 'classnames'
import styles from './reload-cache.module.scss'

type Props = {
	className?: string
	theme?: 'light' | 'dark'
}

export const ReloadCache = ({ className, theme }: Props) => {
	return (
		<button>
			<ReloadIcon
				onClick={revalidateAllTags}
				className={classNames(styles.main, className)}
				theme={theme}
			/>
		</button>
	)
}
