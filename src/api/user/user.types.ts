export type User = {
	roles: Role[]
	name?: string
	id: string
	createdAt: Date
	updatedAt: Date
	isDeleted: boolean
	email: string
	password: string
}

export type UserDto = {
	email: string
	password: string
	name?: string
	roles?: Role[]
	isDeleted?: boolean
}

export enum RoleType {
	fullAccess,
	deleteMarkedForDeletion,
	userGet,
	userPost,
	userPut,
	userDelete,
	breedPost,
	breedPut,
	breedDelete,
	constantPost,
	constantPut,
	constantDelete,
	headerNavbarLinkPost,
	headerNavbarLinkPut,
	headerNavbarLinkDelete,
	mainSliderPost,
	mainSliderPut,
	mainSliderDelete,
	masterPost,
	masterPut,
	masterDelete,
	pricePost,
	pricePut,
	priceDelete,
	procedurePost,
	procedurePut,
	procedureDelete,
	vacancyPost,
	vacancyPut,
	vacancyDelete,
	valuePost,
	valuePut,
	valueDelete,
	filePostPut,
	responseFromAIGet,
	responseFromAIPost,
	responseFromAIPut,
	responseFromAIDelete,
}

export type Role = keyof typeof RoleType
