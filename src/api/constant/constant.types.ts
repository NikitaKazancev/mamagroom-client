import { Language } from '@/i18n/types'
import { CamelToKebab } from '@/utils/types'

export const CONSTANT_TYPES = {
	homePage: 'home-page',
	vacanciesPage: 'vacancies-page',
	mastersPage: 'masters-page',
	dogsPage: 'dogs-page',
	catsPage: 'cats-page',
	reviews: 'reviews',
}

export type ConstantType = keyof typeof CONSTANT_TYPES

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
	title: 'title',
	rating: 'rating',
	amount: 'amount',
	personalRating: 'personal-rating',
	personalAmount: 'personal-amount',
	cleanRating: 'clean-rating',
	cleanAmount: 'clean-amount',
}

export type ConstantName = keyof typeof CONSTANT_NAMES

export type FullConstantName = Record<`${ConstantType}_${ConstantName}`, string>

export type Constant = {
	createdAt: Date
	name: CamelToKebab<ConstantName>
	language: Language
	updatedAt: Date
	type: CamelToKebab<ConstantType>
	value: string
}

export type ConstantDto = {
	language?: Language
	type: CamelToKebab<ConstantType>
	name: CamelToKebab<ConstantName>
	value: string
}
