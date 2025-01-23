/* eslint-disable no-console */
import { Language } from '@/i18n/types'
import { getToken } from '@/utils/cookies/cookies-server.api'
import axios, { AxiosRequestConfig } from 'axios'

export const SERVER_URL = process.env.NEXT_PUBLIC_API
const initialTtl = process.env.NODE_ENV === 'development' ? 1 : 60 * 5

export const request = async ({
	url,
	revalidateTag,
	method,
	ttl,
	auth,
	body,
	recaptchaToken,
}: {
	url: string
	revalidateTag?: RevalidateTag
	method?: 'get' | 'post' | 'put' | 'delete'
	ttl?: number
	auth?: boolean
	body?: any
	recaptchaToken?: string
}) => {
	if (!method) method = 'get'

	if (method === 'get') {
		return await fetchData({ url, ttl, auth, revalidateTag })
	}

	return await mutation({ url, method, body, recaptchaToken })
}

const fetchData = async ({
	url,
	ttl,
	auth,
	body,
	revalidateTag,
}: {
	url: string
	ttl?: number
	auth?: boolean
	body?: any
	revalidateTag?: string
}): Promise<unknown> => {
	if (!ttl) ttl = initialTtl

	const config: RequestInit = {
		next: {
			revalidate: ttl,
			tags: revalidateTag ? [revalidateTag] : undefined,
		},
	}

	if (auth) {
		config.headers = {}
		config.headers['Authorization'] = `Bearer ${await getToken()}`
	}

	if (body) {
		processRequestByBody(body, config)
		config.body = body
	}

	return await fetch(`${SERVER_URL}${url}`, config)
		.then(res => res.json())
		.catch(error =>
			console.error(
				`Error fetching url "${url}": `,
				error.message,
				error.response?.data
			)
		)
}

const mutation = async ({
	url,
	method,
	body,
	recaptchaToken,
}: {
	url: string
	method: 'post' | 'put' | 'delete'
	body?: any
	recaptchaToken?: string
}): Promise<unknown> => {
	const config: AxiosRequestConfig = {
		method,
		url: `${SERVER_URL}${url}`,
		headers: {
			Accept: 'application/json',
			Authorization: `Bearer ${await getToken()}`,
		},
	}

	if (body) {
		processRequestByBody(body, config)
		config.data = body
	}

	if (recaptchaToken && config.headers) {
		config.headers['recaptcha'] = recaptchaToken
	}

	return await axios(config)
		.then(res => res.data)
		.catch(error =>
			console.error(
				`Error fetching url "${url}": `,
				error.message,
				error.response?.data
			)
		)
}

const processRequestByBody = (
	body: any,
	config: AxiosRequestConfig | RequestInit
) => {
	if (!config.headers) {
		config.headers = {}
	}

	if (body.constructor === FormData) {
		// @ts-ignore
		config.headers['Content-Type'] = 'multipart/form-data'
	} else {
		// @ts-ignore
		config.headers['Content-Type'] = 'application/json'
	}
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

export const fullImageName = (imageName?: string) => {
	return imageName ? `${SERVER_URL}${imageName}` : ''
}

export const REVALIDATE_TAGS = {
	breeds: 'breeds',
	constants: 'constants',
	files: 'files',
	headerNavbarLink: 'header-navbar-links',
	mainSlider: 'main-slider',
	masters: 'masters',
	prices: 'prices',
	procedures: 'procedures',
	users: 'users',
	vacancies: 'vacancies',
	values: 'values',
} as const
export type RevalidateTag =
	(typeof REVALIDATE_TAGS)[keyof typeof REVALIDATE_TAGS]
