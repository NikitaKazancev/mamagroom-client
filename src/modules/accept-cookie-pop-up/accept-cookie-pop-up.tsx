'use client'

import { ToastWithButton } from '@/components/toast-with-button/toast-with-button'
import { setCookie } from '@/utils/cookies/cookies-client.api'
import { COOKIES } from '@/utils/cookies/cookies.general'
import { useEffect, useRef } from 'react'
import toast from 'react-hot-toast'

type Props = {
	openOnMount?: boolean
	accept: string
	message: string
}

export const AcceptCookiePopUp = ({ openOnMount, message, accept }: Props) => {
	const toastShownRef = useRef(false)

	const acceptCookie = () => {
		setCookie(COOKIES.isCookiesAccepted, 'true')
	}

	useEffect(() => {
		if (!openOnMount || toastShownRef.current) {
			return
		}

		toastShownRef.current = true
		toast.custom(
			<ToastWithButton
				text={message}
				buttonText={accept}
				onClick={acceptCookie}
			/>,
			{
				duration: Infinity,
			}
		)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return <></>
}
