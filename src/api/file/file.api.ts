import { request, SERVER_URL } from '../request'

export const FILE_PATHS = {
	mainBg: 'pages/home/main-bg.jpg',
}

export type FilePath = keyof typeof FILE_PATHS

class FileAPI {
	url = `${SERVER_URL}/files`

	findDestination(path: FilePath) {
		return `${SERVER_URL}/static/${FILE_PATHS[path]}`
	}

	async post(path: FilePath, file: any) {
		const url = `/${this.url}/${path}`
		await request({ url, method: 'post', body: { file } })
	}
}

export const fileApi = new FileAPI()
