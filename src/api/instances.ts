import { getAccessToken } from '@/utils/cookies'

/* eslint-disable no-console */
export const SERVER_PATH = process.env.API

export const fetchData = async (
	{
		url,
		ttl,
		key,
		auth,
	}: {
		url: string
		ttl?: number
		key?: string
		auth?: boolean
	} = { url: '', ttl: 300 }
) => {
	try {
		const response = await fetch(`${SERVER_PATH}${url}`, {
			next: {
				revalidate: ttl,
				tags: [url],
			},
			headers: {
				Authorization: auth ? `Bearer ${await getAccessToken()}` : '',
			},
		})
			.then(res => res.json())
			.catch(console.error)

		let result = undefined
		if (response.data) {
			result = response.data
		} else if (response.value) {
			result = response.value
		} else {
			result = response
		}

		return result
	} catch (error) {
		console.error(`Error fetching ${url}: `, (error as Error).message)
		return null
	}
}
