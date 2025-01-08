import { request, SERVER_URL } from '../request'

export const FILE_NAMES = {
	mainBg: 'main-bg',
} as const

export const FILE_PATHS = {
	mainBg: `pages/home`,
} as const

export const EXTERNAL_PATHS = {
	mainBg: `${FILE_PATHS.mainBg}/${FILE_NAMES.mainBg}`,
} as const

export type FileName = (typeof FILE_NAMES)[keyof typeof FILE_NAMES]
export type FilePath = (typeof FILE_PATHS)[keyof typeof FILE_PATHS]
export type ExternalPath = (typeof EXTERNAL_PATHS)[keyof typeof EXTERNAL_PATHS]

class FileAPI {
	url = 'files'

	async findDestination(path: FilePath, name: FileName) {
		const url = `/${this.url}?${this.queryParams({ path, name })}`
		const data = (await request({ url, revalidateTag: 'files' })) as {
			fileUrl: string
		}

		if (data) {
			return `${SERVER_URL}${data.fileUrl}`
		}
	}

	async post(path: ExternalPath, data: FormData) {
		const url = `/${this.url}/${path}`
		await request({
			url,
			method: 'post',
			body: data,
		})
	}

	private queryParams({ path, name }: { path: FilePath; name: FileName }) {
		const queryParams = new URLSearchParams()
		queryParams.append('path', path)
		queryParams.append('name', name)

		return queryParams.toString()
	}
}

export const fileApi = new FileAPI()
