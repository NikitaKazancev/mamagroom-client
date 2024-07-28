import { YANDEX_IFRAME_MAP } from '@/constants/yandex.constants'
import classNames from 'classnames'
import styles from './yandex-map.module.scss'

type Props = {
	className?: string
}

export const YandexMap = ({ className }: Props) => {
	return (
		<div className={classNames(styles.map, className)}>
			<iframe src={YANDEX_IFRAME_MAP} loading='lazy'></iframe>
		</div>
	)
}
