import { getCookie } from '@/utils/cookies/cookies-server.api'
import { COOKIES } from '@/utils/cookies/cookies.general'
import { getTranslations } from 'next-intl/server'
import { ReadonlyRequestCookies } from 'next/dist/server/web/spec-extension/adapters/request-cookies'
import { AcceptCookiePopUp } from './accept-cookie-pop-up'

type Props = {
	cookies: ReadonlyRequestCookies
}

export const AcceptCookiePopUpServer = async () => {
	const openOnMount = (await getCookie(COOKIES.isCookiesAccepted)) !== 'true'
	const t = await getTranslations('Cookies')

	return (
		<AcceptCookiePopUp
			openOnMount={openOnMount}
			message={t('message')}
			accept={t('accept')}
		/>
	)
}
