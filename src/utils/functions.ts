import { Language } from '@/i18n/types'
import imageCompression from 'browser-image-compression'
import { format } from 'date-fns'
import toast from 'react-hot-toast'
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

export const formatDate = (date: Date): string => {
	return format(new Date(date), 'MMM dd, yyyy HH:mm')
}

export const minutesToHours = (minutes: number): string => {
	const hours = Math.floor(minutes / 60)
	const mins = minutes % 60

	if (hours && mins) {
		return `${hours}ч ${mins}мин`
	}

	if (hours) {
		return `${hours}ч`
	}

	return `${mins}мин`
}

export function hasLanguageField(data: any): data is { language: Language } {
	return typeof data === 'object' && data !== null && 'language' in data
}

export const compressImage = async (formData: FormData, toastId: string) => {
	if (!isFileReceived(formData)) {
		return
	}

	const file = formData.get('file') as File
	console.log(file.size)

	const maxFileSize = 500 * 1024
	if (file.size < maxFileSize) {
		return
	}

	if (file) {
		toast.loading('Обработка файла...', {
			id: toastId,
		})
		const compressedFile = await imageCompression(file as File, {
			maxSizeMB: maxFileSize / 1024,
		})
		formData.delete('file')
		formData.append('file', compressedFile)
	}
}

export const isFileReceived = (formData: FormData) => {
	const file = formData.get('file') as File
	return file !== null && file.name !== 'undefined'
}
