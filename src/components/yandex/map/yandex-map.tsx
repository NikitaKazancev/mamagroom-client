'use client'

import { LINKS } from '@/constants/links.constants'
import { Button } from '@/ui/button/button'
import classNames from 'classnames'
import { useState } from 'react'
import styles from './yandex-map.module.scss'

type Props = {
	className?: string
	btnText: string
}

export const YandexMap = ({ className, btnText }: Props) => {
	const [active, setActive] = useState(false)

	return (
		<div className={classNames(styles.map, className)}>
			{active ? (
				<iframe src={LINKS.yandex.iframeMap} loading='lazy'></iframe>
			) : (
				<Button
					text={btnText}
					theme='dark'
					onClick={() => setActive(true)}
					className={styles.btn}
				/>
			)}
		</div>
	)
}
