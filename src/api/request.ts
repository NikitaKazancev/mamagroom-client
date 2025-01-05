import { Language } from '@/i18n'
import { token } from '@/utils/cookies'
import axios, { AxiosRequestConfig } from 'axios'
import FormData from 'form-data'

export const SERVER_URL = process.env.API

export const request = async ({
	url,
	method,
	ttl,
	auth,
	body,
}: {
	url: string
	method?: 'get' | 'post' | 'put' | 'delete'
	ttl?: number
	auth?: boolean
	body?: any
}) => {
	if (!method) method = 'get'

	if (method === 'get') {
		return await fetchData({ url, ttl, auth })
	}

	return await mutation({ url, method, body })
}

const fetchData = async ({
	url,
	ttl,
	auth,
	body,
}: {
	url: string
	ttl?: number
	auth?: boolean
	body?: any
}): Promise<unknown> => {
	if (!ttl) ttl = 300

	const config: RequestInit = {
		next: {
			revalidate: ttl,
			tags: [url],
		},
	}

	if (auth) {
		config.headers = {}
		config.headers['Authorization'] = `Bearer ${await token()}`
	}

	if (body) {
		config.body = processRequestBody(body, config)
	}

	try {
		return await fetch(`${SERVER_URL}${url}`, config)
			.then(res => res.json())
			.catch(console.error)
	} catch (error) {
		console.error(`Error fetching url "${url}": `, error)
		return undefined
	}
}

const mutation = async ({
	url,
	method,
	body,
}: {
	url: string
	method: 'post' | 'put' | 'delete'
	body?: any
}): Promise<unknown> => {
	const config: AxiosRequestConfig = {
		method,
		url,
		headers: {
			Accept: 'application/json',
			Authorization: `Bearer ${await token()}`,
		},
	}

	if (body) {
		config.data = processRequestBody(body, config)
	}

	return await axios(config)
		.then(res => res.data)
		.catch(console.error)
}

const processRequestBody = (
	body: any,
	config: AxiosRequestConfig | RequestInit
) => {
	if (!config.headers) {
		config.headers = {}
	}

	if (body.file) {
		const data = new FormData()
		Object.keys(body).forEach(key => data.append(key, body[key]))

		// @ts-ignore: Unreachable code error
		config.headers['Content-Type'] = 'multipart/form-data'
		config.headers = {
			...config.headers,
			...data.getHeaders(),
		}

		return data
	}

	// @ts-ignore: Unreachable code error
	config.headers!['Content-Type'] = 'application/json'
	return body
}

export const basicQueryParams = ({
	language,
	isDeleted,
}: {
	language?: Language
	isDeleted?: boolean
}) => {
	const queryParams = new URLSearchParams()
	if (language !== undefined) queryParams.append('language', language)
	if (isDeleted !== undefined)
		queryParams.append('isDeleted', String(isDeleted))

	return queryParams.toString()
}
