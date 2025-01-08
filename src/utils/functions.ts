import { CamelToKebab, KebabToCamel } from './types'

export const kebabToCamel = <T extends string>(str: T): KebabToCamel<T> => {
	return str.replace(/-./g, match => match[1].toUpperCase()) as KebabToCamel<T>
}

export const camelToKebab = <T extends string>(str: T): CamelToKebab<T> => {
	return str
		.replace(/([a-z])([A-Z])/g, '$1-$2')
		.toLowerCase() as CamelToKebab<T>
}

export const capitalizeFirst = (str: string) =>
	str.charAt(0).toUpperCase() + str.slice(1)

export const formatPhoneNumber = (phone: string) => {
	if (!/^(\+\d{11})$/.test(phone)) {
		throw new Error('Неверный формат номера телефона.')
	}

	const countryCode = phone.slice(0, 2)
	const areaCode = phone.slice(2, 5)
	const firstPart = phone.slice(5, 8)
	const secondPart = phone.slice(8, 10)
	const thirdPart = phone.slice(10)

	return `${countryCode} (${areaCode}) ${firstPart}-${secondPart}-${thirdPart}`
}

export const objectFromFormData = (formData: FormData) =>
	Object.fromEntries(formData.entries())
