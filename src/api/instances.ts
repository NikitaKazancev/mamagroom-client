/* eslint-disable no-console */
import axios, { AxiosInstance } from 'axios'
import https from 'https'
import { cache } from './cache'

const axiosInstance = axios.create({
	httpsAgent: new https.Agent({
		rejectUnauthorized: false,
	}),
})

const axiosInstanceWithAuth = axios.create({
	httpsAgent: new https.Agent({
		rejectUnauthorized: false,
	}),
})

type CacheParams = {
	key: string
	ttl?: number
}

const fetchDataWithoutCache = async (url: string) => {
	try {
		const dataFromAPI = await axiosInstance
			.get(url)
			.then(res => res.data.value)
		return dataFromAPI
	} catch (error) {
		console.error(`Error fetching ${url}: `, error)
		return null
	}
}

const fetchDataWithCache = async (
	instance: AxiosInstance,
	url: string,
	{ key, ttl }: CacheParams = { key: '', ttl: 300 }
) => {
	const data = await cache.get(key)
	if (data) {
		return data
	}

	try {
		const response = await instance.get(url)
		if (response.status !== 200) {
			return null
		}

		let dataFromAPI = await response.data

		let result = undefined
		if (dataFromAPI.data) {
			result = dataFromAPI.data
		} else if (dataFromAPI.value) {
			result = dataFromAPI.value
		} else {
			result = dataFromAPI
		}

		console.log('Data:', result)
		await cache.set(key, result, ttl)
		return result
	} catch (error) {
		console.error(`Error fetching ${url}: `, (error as Error).message)
		return null
	}
}

const fetchData = async (
	url: string,
	cacheParams: CacheParams = { key: '', ttl: 300 }
) => {
	if (cacheParams.key) {
		return await fetchDataWithCache(axiosInstance, url, cacheParams)
	}

	return await fetchDataWithoutCache(url)
}

const fetchDataWithAuth = async (
	url: string,
	cacheParams: CacheParams = { key: '', ttl: 300 }
) => {
	if (cacheParams.key) {
		return await fetchDataWithCache(axiosInstanceWithAuth, url, cacheParams)
	}

	return await fetchDataWithoutCache(url)
}

export { fetchData, fetchDataWithAuth }
