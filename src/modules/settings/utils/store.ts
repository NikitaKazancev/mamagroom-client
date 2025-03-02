import { AuthDto } from '@/api/auth/auth.api'
import { Constant, ConstantDto } from '@/api/constant/constant.types'
import { ExternalPath } from '@/api/file/file.api'
import {
	HeaderNavbarLink,
	HeaderNavbarLinkDto,
} from '@/api/header-navbar-link/header-navbar-link.api'
import { ComponentType } from 'react'
import { create } from 'zustand'

export type SettingsFormType =
	| 'constant_short'
	| 'constant_long'
	| 'auth'
	| 'file'
	| 'header-navbar-link'
	| undefined
export type SettingsFormData =
	| ConstantDto
	| AuthDto
	| HeaderNavbarLinkDto
	| { path: ExternalPath }
	| undefined
export type SettingsFormResultType =
	| undefined
	| string
	| Constant
	| HeaderNavbarLink
export type SettingsFormAllData = HeaderNavbarLink[]
export type SettingFormSetData = (data: SettingsFormData) => void
export type SettingsFormComponent = ComponentType<{
	data: SettingsFormData
	setData: SettingFormSetData
	type: SettingsFormType
	allData?: SettingsFormAllData
}> | null

export type Store = {
	isShown: boolean
	hide: () => void
	Component: SettingsFormComponent
	componentProps?: Record<string, any>
	data: SettingsFormData
	allData?: SettingsFormAllData
	type: SettingsFormType
	show: ({
		componentProps,
		type,
		Component,
		data,
		allData,
	}: {
		Component: SettingsFormComponent
		componentProps?: Record<string, any>
		type: SettingsFormType
		data: SettingsFormData
		allData?: SettingsFormAllData
	}) => void
	setData: SettingFormSetData
}

const useSettingsStore = create<Store>(set => ({
	isShown: false,
	hide: () => set({ isShown: false }),
	Component: null,
	componentProps: {},
	type: 'constant_short',
	show: ({ componentProps, type, Component, data, allData }) =>
		set({ isShown: true, componentProps, type, Component, data, allData }),
	data: undefined,
	setData: data => set({ data }),
}))

export default useSettingsStore
