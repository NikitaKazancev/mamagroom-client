'use client'

import { logout } from '@/api/auth/auth.server'
import { LogoutIcon } from '@/ui/icons/logout/logout'
import { removeToken } from '@/utils/cookies/cookies-client.api'

export const Logout = ({ className }: { className?: string }) => {
	const handleClick = () => {
		logout()
		removeToken()
	}

	return <LogoutIcon onClick={handleClick} className={className} />
}
