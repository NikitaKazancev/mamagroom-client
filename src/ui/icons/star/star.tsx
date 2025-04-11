import classNames from 'classnames'
import { FaStar } from 'react-icons/fa'
import styles from './star.module.scss'

type Props = {
	className?: string
	fill: boolean
}

export const StarIcon = ({ className, fill }: Props) => {
	return (
		<FaStar
			className={classNames(styles.icon, className, fill && styles.fill)}
		/>
	)
}
