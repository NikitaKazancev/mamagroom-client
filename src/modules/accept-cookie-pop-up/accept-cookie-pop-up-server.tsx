import { getTranslation } from '@/context/my-server-context'
import { getCookie } from '@/utils/cookies/cookies-server.api'
import { COOKIES } from '@/utils/cookies/cookies.general'
import { AcceptCookiePopUp } from './accept-cookie-pop-up'

export const AcceptCookiePopUpServer = async () => {
	const openOnMount = (await getCookie(COOKIES.isCookiesAccepted)) !== 'true'
	const t = await getTranslation('Cookies')

	return (
		<AcceptCookiePopUp
			openOnMount={openOnMount}
			message={t('message')}
			accept={t('accept')}
		/>
	)
}
