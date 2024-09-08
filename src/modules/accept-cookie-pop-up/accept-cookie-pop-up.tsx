'use client'

import { PopUp } from '@/components/pop-up/pop-up'
import usePopUpStore from '@/components/pop-up/utils/store'
import { COOKIES } from '@/utils/constants'
import Cookies from 'js-cookie'
import { useEffect } from 'react'

type Props = {
	openOnMount?: boolean
	accept: string
	message: string
}

export const AcceptCookiePopUp = ({ openOnMount, message, accept }: Props) => {
	const { show } = usePopUpStore()

	const acceptCookie = () => {
		Cookies.set(COOKIES.ACCEPT_COOKIE, 'true', { expires: 365 })
	}

	useEffect(() => {
		if (openOnMount) {
			show({ message, buttonTitle: accept, onClick: acceptCookie })
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return <PopUp />
}
