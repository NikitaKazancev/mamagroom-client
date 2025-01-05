import { request, SERVER_URL } from '../request'

export const FILE_PATHS = {
	mainBg: 'pages/home/main-bg',
}

export type FilePath = keyof typeof FILE_PATHS

class FileAPI {
	private url = `${SERVER_URL}/files/static`

	async findDestination(path: FilePath) {
		return `/${this.url}/${path}`
	}

	async post(path: FilePath, file: any) {
		const url = `/${this.url}/${path}`
		await request({ url, method: 'post', body: { file } })
	}
}

export const fileAPI = new FileAPI()
