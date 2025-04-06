import { Role } from '@/api/user/user.types'
import { headers } from 'next/headers'

export type Roles = { [P in Role]: boolean }

export const rolesFromHeader = (): Roles => {
	const hdr = headers()
	const raw = hdr.get('x-user-roles')
	if (!raw) return generateRolesWith(false)

	try {
		const roles = JSON.parse(raw) as Role[]
		const hasFull = roles.includes('fullAccess')
		const roleSet = new Set(roles)
		return generateRolesWith(role => hasFull || roleSet.has(role))
	} catch {
		return generateRolesWith(false)
	}
}

const generateRolesWith = (fn: boolean | ((role: Role) => boolean)): Roles => {
	const roles: Partial<Roles> = {}
	for (const role of Object.keys(ROLES) as Role[]) {
		roles[role] = typeof fn === 'function' ? fn(role) : fn
	}
	return roles as Roles
}

const ROLES: Roles = {
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
