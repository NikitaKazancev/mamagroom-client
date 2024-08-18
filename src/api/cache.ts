/* eslint-disable no-console */
import { createClient } from 'redis'

let cacheClient: ReturnType<typeof createClient>

const connectedCache = async () => {
	if (cacheClient) {
		return cacheClient
	}

	cacheClient = createClient()
	cacheClient.on('error', (err: Error) => {
		console.error('Redis error:', err)
	})

	await cacheClient.connect().catch(console.error)
	return cacheClient
}

const get = async (key: string) => {
	const cache = await connectedCache()

	const data = await cache.get(key)
	if (data) {
		return JSON.parse(data)
	}

	return null
}

const set = async (key: string, data: any, ttl: number = 300) => {
	const cache = await connectedCache()
	await cache.set(key, JSON.stringify(data), { EX: ttl })
}

const del = async (key: string) => {
	const cache = await connectedCache()
	await cache.del(key)
}

export const cache = { get, set, del }
