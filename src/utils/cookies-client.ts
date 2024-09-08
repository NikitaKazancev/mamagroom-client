import Cookies from 'js-cookie'

export const saveAccessToken = async (accessToken: string) => {
	Cookies.set('accessToken', accessToken, {
		domain: 'localhost',
		sameSite: 'strict',
		expires: 1,
	})
}
