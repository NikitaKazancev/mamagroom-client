import { constantApi } from '@/api/constant/constant.api'
import { ConstantType } from '@/api/constant/constant.types'
import { fileApi, FilePath } from '@/api/file/file.api'
import { LINKS } from '@/constants/links.constants'
import { Language } from '@/i18n/types'
import imageCompression from 'browser-image-compression'
import { format } from 'date-fns'
import { Metadata, ResolvingMetadata } from 'next'
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

export const compactText = (text: string, length: number = 200): string => {
	return text.length > length ? `${text.slice(0, length)}...` : text
}

export function hasLanguageField(data: any): data is { language: Language } {
	return typeof data === 'object' && data !== null && 'language' in data
}

export const wordByAmount = (amount: number, words: string) => {
	const listOfWords = words.split(',')

	if (amount % 10 === 1 && amount % 100 !== 11) {
		return listOfWords[0]
	} else if (
		amount % 10 >= 2 &&
		amount % 10 <= 4 &&
		(amount % 100 < 10 || amount % 100 >= 20)
	) {
		return listOfWords[1]
	} else {
		return listOfWords[2]
	}
}

export const compressImage = async (formData: FormData, toastId: string) => {
	if (!isFileReceived(formData)) {
		return
	}

	const file = formData.get('file') as File

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
	return file !== null && file.name && file.name !== 'undefined'
}

export const buildMetadata = async ({
	params,
	constantsType,
	parentMetadata,
	pageName,
	title,
}: {
	params: { locale: Language }
	constantsType: ConstantType
	parentMetadata: ResolvingMetadata
	pageName: string
	title?: string
}): Promise<Metadata> => {
	const constants = await constantApi.findMany({
		language: params.locale as Language,
		type: constantsType,
	})

	const parent = await parentMetadata.then(metadata => metadata)

	if (!title) {
		title = constants[`${constantsType}_mainTitle`]
	}
	const description = constants[`${constantsType}_mainDescription`]

	return {
		title,
		description,
		alternates: {
			canonical: '.',
			languages: {
				ru: `/ru/${pageName}`,
				en: `/en/${pageName}`,
				'x-default': `/ru/${pageName}`,
			},
		},
		openGraph: {
			...parent?.openGraph,
			title,
			description,
			url: `${LINKS.site.url}${params.locale}/${pageName}`,
		},
	}
}

export const generalPageData = async ({
	params,
	constantsPageType,
	mainImagePageType,
}: {
	params: { locale: Language }
	constantsPageType: ConstantType
	mainImagePageType: FilePath
}) => {
	const constants = await constantApi.findMany({
		language: params.locale,
		type: constantsPageType,
	})

	const mainImageUrl = await fileApi.findDestination(
		mainImagePageType,
		'main-bg'
	)

	return { constants, mainImageUrl }
}
