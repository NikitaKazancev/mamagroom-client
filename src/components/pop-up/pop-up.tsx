'use client'

import { Button } from '@/ui/button/button'
import classNames from 'classnames'
import styles from './pop-up.module.scss'
import usePopUpStore from './utils/store'

export const PopUp = () => {
	const { isShown, hide, message, buttonTitle, onClick } = usePopUpStore()

	const handleClick = () => {
		hide()
		if (onClick) {
			onClick()
		}
	}

	return (
		<div
			className={classNames(styles.main, isShown && styles.isShown)}
			onClick={handleClick}
		>
			<span className={styles.message}>{message}</span>
			{buttonTitle ? <Button text={buttonTitle} theme='dark' /> : null}
		</div>
	)
}
