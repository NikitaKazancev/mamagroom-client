import { Language } from '@/i18n'

export const CONSTANT_TYPES = {
	homePage: 'home-page',
}

export const CONSTANT_NAMES = {
	mainTitle: 'main-title',
	mainDescription: 'main-description',
	aboutUsTitle: 'about-us-title',
	aboutUsDescription: 'about-us-description',
	proceduresForDogsTitle: 'procedures-for-dogs-title',
	proceduresForDogsDescription: 'procedures-for-dogs-description',
	proceduresForCatsTitle: 'procedures-for-cats-title',
	proceduresForCatsDescription: 'procedures-for-cats-description',
	valuesTitle: 'values-title',
}

export type Constant = {
	createdAt: Date
	name: string
	language: string
	updatedAt: Date
	type: string
	value: string
}

export type ConstantDto = {
	language: Language
	type: string
	name: string
	value: string
}
