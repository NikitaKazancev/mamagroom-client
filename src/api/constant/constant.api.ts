import { NAV_LINKS } from '@/constants/pages.constants'
import axios from 'axios'
import https from 'https'

class ConstantAPI {
	private CONSTANTS = `${process.env.API}/constants`
	private instance = axios.create({
		httpsAgent: new https.Agent({
			// cert: readFileSync('./secrets/www_mamagroom_ru.pem'),
			// key: readFileSync('./secrets/www_mamagroom_ru-key.pem'),
			// ca: readFileSync('./secrets/www_mamagroom_ru-ca.pem'),
			rejectUnauthorized: false,
		}),
	})

	async findHeaderNavLinks({ lang }: { lang: string }) {
		try {
			const res = await this.instance
				.get(`${this.CONSTANTS}/header_nav_links?lang=${lang}`)
				.then(res => res.data)

			return (res as ConstantFromServer & { value: NavLink[] }).value
		} catch (error) {
			console.error(error)
			return NAV_LINKS
		}
	}

	// const res = await fetch(
	// 	`${this.CONSTANTS}/header_nav_links?lang=${lang}`,
	// 	{
	// 		next: { revalidate: 300 },
	// 	}
	// ).then(res => res.json())
}

export const constantAPI = new ConstantAPI()
