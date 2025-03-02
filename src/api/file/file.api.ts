import { request, SERVER_URL } from '../request'

export const FILE_NAMES = {
	mainBg: 'main-bg',
} as const

export const FILE_PATHS = {
	mainPage: `pages/home`,
	vacanciesPage: 'pages/vacancies',
	mastersPage: 'pages/masters',
} as const

export const EXTERNAL_PATHS = {
	mainPageMainBg: `${FILE_PATHS.mainPage}/${FILE_NAMES.mainBg}`,
	vacanciesPageMainBg: `${FILE_PATHS.vacanciesPage}/${FILE_NAMES.mainBg}`,
	mastersPageMainBg: `${FILE_PATHS.mastersPage}/${FILE_NAMES.mainBg}`,
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
