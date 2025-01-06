import { basicQueryParams, fullImageName, request } from '../request'

type MainSlider = {
	id: string
	imageName: string
	order: number
	createdAt: Date
	updatedAt: Date
	isDeleted: boolean
}

type MainSliderDto = {
	imageName?: string
	order?: number
	isDeleted?: boolean
	file?: any
}

class MainSliderApi {
	url = 'main-slider'

	async findMany(queryParams: { isDeleted?: boolean }) {
		const url = `/${this.url}?${basicQueryParams(queryParams)}`
		const data = (await request({ url })) as MainSlider[]

		if (data) {
			data.forEach(mainSlider => {
				mainSlider.imageName = fullImageName(mainSlider.imageName)
			})

			return data
		}

		return []
	}

	async findById(id: string) {
		const url = `/${this.url}/${id}`
		const data = (await request({ url })) as MainSlider

		if (data) {
			data.imageName = fullImageName(data.imageName)
			return data
		}
	}

	async post(mainSlider: MainSliderDto) {
		const url = `/${this.url}`
		const data = (await request({
			url,
			method: 'post',
			body: mainSlider,
		})) as MainSlider

		if (data) {
			data.imageName = fullImageName(data.imageName)
			return data
		}
	}

	async put(id: string, mainSlider: MainSliderDto) {
		const url = `/${this.url}/${id}`
		const data = (await request({
			url,
			method: 'put',
			body: mainSlider,
		})) as MainSlider

		if (data) {
			data.imageName = fullImageName(data.imageName)
			return data
		}
	}

	async delete(id: string) {
		const url = `/${this.url}/${id}`
		const data = (await request({ url, method: 'delete' })) as MainSlider

		if (data) {
			data.imageName = fullImageName(data.imageName)
			return data
		}
	}
}

export const mainSliderApi = new MainSliderApi()
