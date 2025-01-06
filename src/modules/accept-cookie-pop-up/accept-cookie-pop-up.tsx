'use client'

import { PopUp } from '@/components/pop-up/pop-up'
import usePopUpStore from '@/components/pop-up/utils/store'
import { setCookie } from '@/utils/cookies/cookies-client.api'
import { COOKIES } from '@/utils/cookies/cookies.general'
import { useEffect } from 'react'

type Props = {
	openOnMount?: boolean
	accept: string
	message: string
}

export const AcceptCookiePopUp = ({ openOnMount, message, accept }: Props) => {
	const { show } = usePopUpStore()

	const acceptCookie = () => {
		setCookie(COOKIES.isCookiesAccepted, 'true')
	}

	useEffect(() => {
		if (openOnMount) {
			show({ message, buttonTitle: accept, onClick: acceptCookie })
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return <PopUp />
}
