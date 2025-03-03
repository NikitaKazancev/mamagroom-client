'use client'

import { useEffect } from 'react'
import toast from 'react-hot-toast'

export const WorkingMessage = () => {
	useEffect(() => {
		toast(
			'Приложение находится в разработке...\nНа данном сайте пока представлены только тестовые данные',
			{
				duration: Infinity,
			}
		)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return <></>
}
