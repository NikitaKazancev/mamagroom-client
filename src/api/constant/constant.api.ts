import { fetchData } from '../instances'

class ConstantAPI {
	private CONSTANTS = `${process.env.API}/constants`

	async findHeaderNavLinks({ lang }: { lang: string }) {
		const data = await fetchData(
			`${this.CONSTANTS}/header_nav_links?lang=${lang}`,
			{ key: 'header_nav_links' }
		)

		if (!data) {
			return []
		}

		return data
	}
}

export const constantAPI = new ConstantAPI()
