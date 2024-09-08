import Cookies from 'js-cookie'

export const saveAccessToken = async (accessToken: string) => {
	Cookies.set('accessToken', accessToken, {
		domain: process.env.NEXT_PUBLIC_DOMAIN,
		sameSite: 'strict',
		expires: 1,
	})
}
