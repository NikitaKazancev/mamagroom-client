import { fetchData, SERVER_PATH } from '../instances'

class FileAPI {
	private FILES = `${SERVER_PATH}/files`

	async findSliderAboutUsDestinations() {
		// const data = await fetchData(`${this.FILES}/pages/home/slider-about-us`)
		const data = await fetchData({ url: '/files/pages/home/slider-about-us' })

		if (!data) {
			return []
		}

		return data.map((url: string) => `${SERVER_PATH}${url}`)
	}

	findHomePageMainBgDestination() {
		return `${SERVER_PATH}/static/pages/home/main-bg.jpg`
	}
}

export const fileAPI = new FileAPI()
