import classNames from 'classnames'
import styles from './video.module.scss'

type Props = {
	src: string
	className?: string
}

export const Video = ({ className, src }: Props) => {
	return (
		<div className={classNames(className, styles.video)}>
			<iframe
				src={src}
				allow='autoplay; fullscreen; picture-in-picture; encrypted-media; gyroscope; accelerometer; clipboard-write;'
			></iframe>
		</div>
	)
}
