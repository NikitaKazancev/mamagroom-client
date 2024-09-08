'use client'

import { saveAccessToken } from '@/utils/cookies-client'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

export default function AdminAuthRedirect() {
	const searchParams = useSearchParams()
	const router = useRouter()

	useEffect(() => {
		const accessToken = searchParams.get('accessToken')
		if (accessToken) saveAccessToken(accessToken)

		router.replace('/admin')
	}, [])

	return <div>Loading...</div>
}
