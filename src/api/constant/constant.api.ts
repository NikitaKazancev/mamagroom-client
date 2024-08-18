import { fetchData, SERVER_PATH } from '../instances'
import { MainTitle } from './constant.types'
import { mainTitleUrl } from './constant.url'

class ConstantAPI {
	async findMainTitle({ language }: { language: string }): Promise<MainTitle> {
		const url = mainTitleUrl(language)
		const data = await fetchData(`${SERVER_PATH}${url}`, { key: url })

		if (!data) {
			return {
				title: '',
				description: '',
			}
		}

		return data
	}
}

export const constantAPI = new ConstantAPI()
