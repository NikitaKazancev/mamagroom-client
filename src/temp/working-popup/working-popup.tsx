'use client'

import usePopUpStore from '@/components/pop-up/utils/store'
import { useEffect } from 'react'

export const WorkingPopup = () => {
	const { show } = usePopUpStore()

	useEffect(() => {
		show({
			message:
				'Приложение находится в разработке... На данном сайте пока представлены только тестовые данные',
		})
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return <></>
}
