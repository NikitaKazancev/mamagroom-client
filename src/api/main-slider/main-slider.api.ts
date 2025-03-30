import { basicQueryParams, fullImageName, request } from '../request'

export type MainSlider = {
	id: string
	imageName: string
	order: number
	createdAt: Date
	updatedAt: Date
	isDeleted: boolean
}

export type MainSliderDto = {
	id: string
	imageName?: string
	order?: number
	isDeleted?: boolean
	file?: any
}

class MainSliderApi {
	url = 'main-slider'

	async findMany(queryParams: { isDeleted?: boolean }) {
		const url = `/${this.url}?${basicQueryParams(queryParams)}`
		const data = (await request({
			url,
			revalidateTag: 'main-slider',
		})) as MainSlider[]

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

	async post(mainSlider: FormData) {
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

	async put(id: string, mainSlider: FormData | MainSliderDto) {
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
