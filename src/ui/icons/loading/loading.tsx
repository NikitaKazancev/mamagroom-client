import classNames from 'classnames'
import Image from 'next/image'
import styles from './loading.module.scss'

export const LoadingIcon = ({
	className,
	onClick,
}: {
	className?: string
	onClick?: () => void
}) => {
	return (
		<Image
			className={classNames(styles.icon, className)}
			onClick={onClick}
			src={'/loading.svg'}
			alt='loading'
			width={1}
			height={1}
		/>
	)
}
