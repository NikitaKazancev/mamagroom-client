import console from 'console'
import { fetchData } from '../instances'

class FileAPI {
	private FILES = `${process.env.API}/files`

	async findDestinationsSliderAboutUs() {
		const data = await fetchData(`${this.FILES}/slider-about-us`)
		console.log(`${this.FILES}/slider-about-us`)

		if (!data) {
			return []
		}

		return data.map((url: string) => `${process.env.API}${url}`)
	}
}

export const fileAPI = new FileAPI()
