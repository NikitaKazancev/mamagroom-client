import { request } from '../request'

export type Review = {
	id: string
	name: string
	rating: number
	date: Date
	description: string
	createdAt: Date
	updatedAt: Date
}

export type ReviewDto = {
	id: string
	name: string
	rating: number
	date: Date
	description: string
}

class ReviewApi {
	url = 'reviews'

	async findMany() {
		const url = `/${this.url}`
		let data = (await request({ url, revalidateTag: 'reviews' })) as Review[]

		if (data) {
			return data
		}

		return []
	}

	async findById(id: string) {
		const url = `/${this.url}/${id}`
		const data = (await request({ url, revalidateTag: 'reviews' })) as Review

		return data
	}

	async post(review: ReviewDto) {
		const url = `/${this.url}`
		const data = (await request({
			url,
			method: 'post',
			body: review,
		})) as Review

		return data
	}

	async put(id: string, review: ReviewDto) {
		const url = `/${this.url}/${id}`
		const data = (await request({
			url,
			method: 'put',
			body: review,
		})) as Review

		return data
	}

	async delete(id: string) {
		const url = `/${this.url}/${id}`
		const data = (await request({ url, method: 'delete' })) as Review

		return data
	}
}

export const reviewApi = new ReviewApi()
