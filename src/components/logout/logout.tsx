'use client'

import { logout } from '@/api/auth/auth.server'
import { useRouter } from '@/i18n/routing'
import { LogoutIcon } from '@/ui/icons/logout/logout'
import { removeToken } from '@/utils/cookies/cookies-client.api'

export const Logout = ({ className }: { className?: string }) => {
	const router = useRouter()

	const handleClick = async () => {
		logout()
		removeToken()
		router.refresh()
	}

	return <LogoutIcon onClick={handleClick} className={className} />
}
