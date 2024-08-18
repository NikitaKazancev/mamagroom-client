/* eslint-disable no-console */
// app/custom-api/clear-cache/route.ts
import { cache } from '@/api/cache'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
	try {
		const key = req.nextUrl.searchParams.get('key')
		if (!key) {
			return NextResponse.json(
				{ message: 'Key is required' },
				{ status: 400 }
			)
		}

		await cache.del(key)

		return NextResponse.json(
			{ message: 'Cache cleared successfully' },
			{ status: 200 }
		)
	} catch (error) {
		console.error('Error clearing cache:', error)
		return NextResponse.json(
			{ message: 'Error clearing cache' },
			{ status: 500 }
		)
	}
}
