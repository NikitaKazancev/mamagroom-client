import { request, SERVER_URL } from '../request'

export const FILE_PATHS = {
	mainBg: 'pages/home/main-bg',
}

export type FilePath = keyof typeof FILE_PATHS

class FileAPI {
	url = 'files'

	findDestination(path: FilePath) {
		return `${SERVER_URL}/static/${FILE_PATHS[path]}.jpg`
	}

	async post(path: FilePath, data: FormData) {
		const url = `/${this.url}/${path}`
		await request({
			url,
			method: 'post',
			body: data,
		})
	}
}

export const fileApi = new FileAPI()
