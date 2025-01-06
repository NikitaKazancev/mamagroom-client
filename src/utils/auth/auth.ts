import { Role } from '@/api/user/user.types'
import { jwtVerify } from 'jose'
import { getToken } from '../cookies/cookies-server.api'

export const ROLES: { [P in Role]: boolean } = {
	fullAccess: false,
	deleteMarkedForDeletion: false,
	userGet: false,
	userPost: false,
	userPut: false,
	userDelete: false,
	breedPost: false,
	breedPut: false,
	breedDelete: false,
	constantPost: false,
	constantPut: false,
	constantDelete: false,
	headerNavbarLinkPost: false,
	headerNavbarLinkPut: false,
	headerNavbarLinkDelete: false,
	mainSliderPost: false,
	mainSliderPut: false,
	mainSliderDelete: false,
	masterPost: false,
	masterPut: false,
	masterDelete: false,
	pricePost: false,
	pricePut: false,
	priceDelete: false,
	procedurePost: false,
	procedurePut: false,
	procedureDelete: false,
	vacancyPost: false,
	vacancyPut: false,
	vacancyDelete: false,
	valuePost: false,
	valuePut: false,
	valueDelete: false,
	filePostPut: false,
	responseFromAIGet: false,
	responseFromAIPost: false,
	responseFromAIPut: false,
	responseFromAIDelete: false,
}

export const fillRoles = async () => {
	const token = await getToken()
	if (!token) {
		fillWith(false)
		return
	}

	const { payload } = await jwtVerify(
		token,
		new TextEncoder().encode(process.env.JWT_SECRET)
	)

	if (!payload?.roles) {
		fillWith(false)
		return
	}

	const roles = payload.roles as Role[]

	if (roles.includes('fullAccess')) {
		fillWith(true)
	}

	for (const role of roles) {
		ROLES[role] = true
	}
}

const fillWith = (value: boolean) => {
	for (const role in ROLES) {
		ROLES[role as Role] = value
	}
}
