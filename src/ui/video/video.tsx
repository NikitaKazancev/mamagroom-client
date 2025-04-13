'use client'

import classNames from 'classnames'
import { useEffect, useRef } from 'react'
import styles from './video.module.scss'

type Props = {
	src: string
	className?: string
	label?: string
	thumbnail?: string
}

export const Video = ({ className, src, label, thumbnail }: Props) => {
	const videoRef = useRef<HTMLVideoElement | null>(null)

	useEffect(() => {
		import('plyr').then(module => {
			const Plyr = module.default
			const player = new Plyr(videoRef.current!, {})

			return () => player.destroy()
		})
	}, [])

	return (
		<video
			ref={videoRef}
			className={classNames(styles.video, className)}
			controls
			playsInline
			aria-label={label}
			poster={thumbnail}
		>
			<source src={src} type='video/mp4' />
		</video>
	)
}
