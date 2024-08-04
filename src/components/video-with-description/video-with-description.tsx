import { SectionTitle } from '@/ui/section-title/section-title'
import { Video } from '@/ui/video/video'
import classNames from 'classnames'
import styles from './video-with-description.module.scss'

type Props = {
	title?: string
	description?: string
	videoSrc: string
	className?: string
	icon?: React.ReactNode
}

export const VideoWithDescription = ({
	title,
	description,
	videoSrc,
	className,
	icon,
}: Props) => {
	return (
		<div className={classNames(styles.main, className)}>
			<div className={styles.titleWrapper}>
				{title && (
					<SectionTitle
						text={title}
						color='blue'
						className={styles.title}
					/>
				)}
				{icon && <div className={styles.icon}>{icon}</div>}{' '}
			</div>
			{description && <p className={styles.description}>{description}</p>}
			<Video src={videoSrc} className={styles.video} />
		</div>
	)
}
