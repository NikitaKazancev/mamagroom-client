'use client'

import styles from './full-transparent-block.module.scss'
import useFullTransparentBlockStore from './utils/store'

export const FullTransparentBlock = () => {
	const { isShown, hide } = useFullTransparentBlockStore()

	return (
		<div
			className={styles.main}
			style={{ display: isShown ? 'block' : 'none' }}
			onClick={hide}
		></div>
	)
}
