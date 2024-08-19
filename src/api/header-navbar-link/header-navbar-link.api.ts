import { fetchData } from '../instances'
import { HeaderNavbarLink } from './header-navbar-link.types'

export const headerNavbarLinkUrl = (language: string) =>
	`/header-navbar-links?language=${language}`

class HeaderNavbarLinkAPI {
	async findMany({
		language,
	}: {
		language: string
	}): Promise<HeaderNavbarLink[]> {
		const url = headerNavbarLinkUrl(language)
		// const data = await fetchData(`${SERVER_PATH}${url}`, { key: url })
		const data = await fetchData({ url })

		if (!data) {
			return []
		}

		return data
	}
}

export const headerNavbarLinkAPI = new HeaderNavbarLinkAPI()
