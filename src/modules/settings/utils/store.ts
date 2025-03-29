import { AuthDto } from '@/api/auth/auth.api'
import { Breed, BreedDto } from '@/api/breed/breed.api'
import { Constant, ConstantDto } from '@/api/constant/constant.types'
import { ExternalPath } from '@/api/file/file.api'
import {
	HeaderNavbarLink,
	HeaderNavbarLinkDto,
} from '@/api/header-navbar-link/header-navbar-link.api'
import { MainSlider, MainSliderDto } from '@/api/main-slider/main-slider.api'
import { Price, PriceDto } from '@/api/price/price.api'
import { Procedure } from '@/api/procedure/procedure.api'
import { Value, ValueDto } from '@/api/values/values.api'
import { ComponentType } from 'react'
import { create } from 'zustand'

export type SettingsFormType =
	| 'constant_short'
	| 'constant_long'
	| 'auth'
	| 'file'
	| 'header-navbar-link'
	| 'value'
	| 'main-slider'
	| 'breed'
	| 'price'
	| undefined
export type SettingsFormData =
	| ConstantDto
	| AuthDto
	| HeaderNavbarLinkDto
	| ValueDto
	| MainSliderDto
	| BreedDto
	| PriceDto
	| { path: ExternalPath }
	| undefined
export type SettingsFormResultType =
	| undefined
	| string
	| Constant
	| HeaderNavbarLink
	| Value
	| MainSlider
	| Breed
	| Price
export type SettingFormSetData = (data: SettingsFormData) => void
export type SettingsFormComponent = ComponentType<{
	data: SettingsFormData
	setData: SettingFormSetData
	type: SettingsFormType
	headerNavbarLinks?: HeaderNavbarLink[]
	procedures?: Procedure[]
	formTitle: string
	method?: 'post' | 'put'
}> | null

export type Store = {
	isShown: boolean
	formTitle: string
	hide: () => void
	Component: SettingsFormComponent
	componentProps?: Record<string, any>
	data: SettingsFormData
	headerNavbarLinks?: HeaderNavbarLink[]
	procedures?: Procedure[]
	type: SettingsFormType
	method: 'post' | 'put'
	show: ({
		componentProps,
		type,
		Component,
		data,
		headerNavbarLinks,
		procedures,
		method,
		formTitle,
	}: {
		Component: SettingsFormComponent
		componentProps?: Record<string, any>
		type: SettingsFormType
		data?: SettingsFormData
		headerNavbarLinks?: HeaderNavbarLink[]
		procedures?: Procedure[]
		method: 'post' | 'put'
		formTitle: string
	}) => void
	setData: SettingFormSetData
}

const useSettingsStore = create<Store>(set => ({
	isShown: false,
	formTitle: 'Настройки',
	hide: () => set({ isShown: false }),
	Component: null,
	componentProps: {},
	type: 'constant_short',
	method: 'put',
	show: ({
		componentProps,
		type,
		Component,
		data,
		headerNavbarLinks,
		procedures,
		method,
		formTitle,
	}) =>
		set({
			isShown: true,
			componentProps,
			type,
			Component,
			data,
			headerNavbarLinks,
			procedures,
			method,
			formTitle,
		}),
	data: undefined,
	setData: data => set({ data }),
}))

export default useSettingsStore
