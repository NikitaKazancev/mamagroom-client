'use client'

import { setToken } from '@/utils/cookies/cookies-server.api'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

import styles from './auth-redirect.module.scss'

export const AuthRedirect = () => {
	const searchParams = useSearchParams()
	const router = useRouter()

	useEffect(() => {
		const func = async () => {
			const token = searchParams.get('token')
			if (token) await setToken(token)
			router.replace('/')
		}
		func()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return <div className={styles.main}>Loading...</div>
}
