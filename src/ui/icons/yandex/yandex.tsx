import classNames from 'classnames'
import { FaYandex } from 'react-icons/fa'
import styles from './yandex.module.scss'

export const YandexIcon = ({
	className,
	onClick,
}: {
	className?: string
	onClick?: () => void
}) => {
	return (
		<FaYandex
			className={classNames(styles.icon, className)}
			onClick={onClick}
		/>
	)
}
