import { fetchData, SERVER_PATH } from '../instances'
import { HeaderNavbarLink } from './header-navbar-link.types'
import { headerNavbarLinkUrl } from './header-navbar-link.url'

class HeaderNavbarLinkAPI {
	async findMany({
		language,
	}: {
		language: string
	}): Promise<HeaderNavbarLink[]> {
		const url = headerNavbarLinkUrl(language)
		const data = await fetchData(`${SERVER_PATH}${url}`, { key: url })

		if (!data) {
			return []
		}

		return data
	}
}

export const headerNavbarLinkAPI = new HeaderNavbarLinkAPI()
