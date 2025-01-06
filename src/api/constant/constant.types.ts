import { Language } from '@/i18n'
import { CamelToKebab } from '@/utils/types'

export const CONSTANT_TYPES = {
	homePage: 'home-page',
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
}

export type ConstantName = keyof typeof CONSTANT_NAMES

export type FullConstantName = Record<`${ConstantType}_${ConstantName}`, string>

export type Constant = {
	createdAt: Date
	name: CamelToKebab<ConstantName>
	language: string
	updatedAt: Date
	type: CamelToKebab<ConstantType>
	value: string
}

export type ConstantDto = {
	language: Language
	type: CamelToKebab<ConstantType>
	name: CamelToKebab<ConstantName>
	value: string
}
