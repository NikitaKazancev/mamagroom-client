'use client'

import classNames from 'classnames'
import { useEffect, useRef } from 'react'
import styles from './video.module.scss'

type Props = {
	src: string
	posterSrc: string
	className?: string
}

export const Video = ({ className, src, posterSrc }: Props) => {
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
			data-poster={posterSrc}
		>
			<source src={src} type='video/mp4' />
		</video>
	)
}
