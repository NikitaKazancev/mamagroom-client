import { LINKS } from '@/constants/links.constants'
import classNames from 'classnames'
import styles from './yandex-map.module.scss'

type Props = {
	className?: string
}

export const YandexMap = ({ className }: Props) => {
	return (
		<div className={classNames(styles.map, className)}>
			<iframe src={LINKS.yandex.iframeMap} loading='lazy'></iframe>
		</div>
	)
}
