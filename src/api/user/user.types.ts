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
	reviewPost,
	reviewPut,
	reviewDelete,
	filePostPut,
	responseFromAIGet,
	responseFromAIPost,
	responseFromAIPut,
	responseFromAIDelete,
}

export enum RoleName {
	fullAccess = 'Полный доступ',
	deleteMarkedForDeletion = 'Удалить помеченные для удаления',
	userGet = 'Получить пользователей',
	userPost = 'Добавить пользователя',
	userPut = 'Изменить пользователя',
	userDelete = 'Удалить пользователя',
	breedPost = 'Добавить породу',
	breedPut = 'Изменить породу',
	breedDelete = 'Удалить породу',
	constantPost = 'Добавить текст на сайте',
	constantPut = 'Изменить текст на сайте',
	constantDelete = 'Удалить текст на сайте',
	headerNavbarLinkPost = 'Добавить ссылку в шапке',
	headerNavbarLinkPut = 'Изменить ссылку в шапке',
	headerNavbarLinkDelete = 'Удалить ссылку в шапке',
	mainSliderPost = 'Добавить слайд в главный слайдер',
	mainSliderPut = 'Изменить слайд в главном слайдере',
	mainSliderDelete = 'Удалить слайд из главного слайдера',
	masterPost = 'Добавить мастера',
	masterPut = 'Изменить мастера',
	masterDelete = 'Удалить мастера',
	pricePost = 'Добавить цену',
	pricePut = 'Изменить цену',
	priceDelete = 'Удалить цену',
	procedurePost = 'Добавить процедуру',
	procedurePut = 'Изменить процедуру',
	procedureDelete = 'Удалить процедуру',
	vacancyPost = 'Добавить вакансию',
	vacancyPut = 'Изменить вакансию',
	vacancyDelete = 'Удалить вакансию',
	valuePost = 'Добавить ценность',
	valuePut = 'Изменить ценность',
	valueDelete = 'Удалить ценность',
	reviewPost = 'Добавить отзыв',
	reviewPut = 'Изменить отзыв',
	reviewDelete = 'Удалить отзыв',
	filePostPut = 'Изменить картинку',
	responseFromAIGet = 'Получить ответ от AI',
	responseFromAIPost = 'Добавить ответ от AI',
	responseFromAIPut = 'Изменить ответ от AI',
	responseFromAIDelete = 'Удалить ответ от AI',
}

export const roleName = (role: Role): string => {
	return RoleName[role]
}

export type Role = keyof typeof RoleType
