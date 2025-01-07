import { Language } from '@/i18n'
import { Roles } from './auth/auth'

export type CamelToKebab<T extends string> =
	T extends `${infer First}${infer Rest}`
		? Rest extends Uncapitalize<Rest>
			? `${Lowercase<First>}${CamelToKebab<Rest>}`
			: `${Lowercase<First>}-${CamelToKebab<Rest>}`
		: T

export type KebabToCamel<T extends string> =
	T extends `${infer First}-${infer Rest}`
		? `${First}${Capitalize<KebabToCamel<Rest>>}`
		: T

export type GeneralProps = {
	language: Language
	roles: Roles
}
