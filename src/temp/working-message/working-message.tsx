'use client'

import myToast from '@/utils/dynamics/toast'
import { useEffect } from 'react'

export const WorkingMessage = () => {
	useEffect(() => {
		const func = async () => {
			const toast = await myToast()

			toast(
				'Приложение находится в разработке...\nНа данном сайте пока представлены только тестовые данные',
				{
					duration: Infinity,
				}
			)
		}

		func()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return <></>
}
