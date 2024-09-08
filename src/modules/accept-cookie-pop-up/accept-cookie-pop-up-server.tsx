import { COOKIES } from '@/utils/constants'
import { getTranslations } from 'next-intl/server'
import { ReadonlyRequestCookies } from 'next/dist/server/web/spec-extension/adapters/request-cookies'
import { AcceptCookiePopUp } from './accept-cookie-pop-up'

type Props = {
	cookies: ReadonlyRequestCookies
}

export const AcceptCookiePopUpServer = async ({ cookies }: Props) => {
	const openOnMount = cookies.get(COOKIES.ACCEPT_COOKIE)?.value !== 'true'
	const t = await getTranslations('Cookies')

	return (
		<AcceptCookiePopUp
			openOnMount={openOnMount}
			message={t('message')}
			accept={t('accept')}
		/>
	)
}
