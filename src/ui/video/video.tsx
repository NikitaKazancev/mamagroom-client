'use client'

import classNames from 'classnames'
import { useEffect, useRef } from 'react'
import styles from './video.module.scss'

type Props = {
	src: string
	className?: string
	label?: string
}

export const Video = ({ className, src, label }: Props) => {
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
		>
			<source src={src} type='video/mp4' />
		</video>
	)
}
