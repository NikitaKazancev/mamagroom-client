'use client'

import { Button } from '@/ui/button/button'
import myToast from '@/utils/dynamics/toast'
import styles from './toast-with-button.module.scss'

type Props = {
	text: string
	buttonText: string
	onClick: () => void
}

export const ToastWithButton = ({ text, buttonText, onClick }: Props) => {
	const handleClick = async () => {
		onClick()
		const toast = await myToast()
		toast.remove()
	}

	return (
		<aside className={styles.toast} role='alert' aria-live='assertive'>
			<p>{text}</p>
			<Button text={buttonText} theme='dark' onClick={handleClick} />
		</aside>
	)
}
