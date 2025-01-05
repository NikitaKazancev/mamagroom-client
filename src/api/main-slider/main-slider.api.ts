import { basicQueryParams, request } from '../request'

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
		const data = await request({ url })

		if (data) {
			return data as MainSlider[]
		}

		return []
	}

	async findById(id: string) {
		const url = `/${this.url}/${id}`
		const data = await request({ url })

		if (data) {
			return data as MainSlider
		}
	}

	async post(mainSlider: MainSliderDto) {
		const url = `/${this.url}`
		const data = await request({
			url,
			method: 'post',
			body: mainSlider,
		})

		if (data) {
			return data as MainSlider
		}
	}

	async put(id: string, mainSlider: MainSliderDto) {
		const url = `/${this.url}/${id}`
		const data = await request({ url, method: 'put', body: mainSlider })

		if (data) {
			return data as MainSlider
		}
	}

	async delete(id: string) {
		const url = `/${this.url}/${id}`
		const data = await request({ url, method: 'delete' })

		if (data) {
			return data as MainSlider
		}
	}
}

export const mainSliderApi = new MainSliderApi()
