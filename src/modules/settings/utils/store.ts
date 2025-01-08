import { AuthDto } from '@/api/auth/auth.api'
import { ConstantDto } from '@/api/constant/constant.types'
import { HeaderNavbarLinkDto } from '@/api/header-navbar-link/header-navbar-link.api'
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
	| File
	| HeaderNavbarLinkDto
	| undefined
export type SettingFormSetData = (data: SettingsFormData) => void
export type SettingsFormComponent = ComponentType<{
	data: SettingsFormData
	setData: SettingFormSetData
	type: SettingsFormType
}> | null

export type Store = {
	isShown: boolean
	hide: () => void
	Component: SettingsFormComponent
	componentProps?: Record<string, any>
	data: SettingsFormData
	type: SettingsFormType
	show: ({
		componentProps,
		type,
		Component,
		data,
	}: {
		Component: SettingsFormComponent
		componentProps?: Record<string, any>
		type: SettingsFormType
		data: SettingsFormData
	}) => void
	setData: SettingFormSetData
}

const useSettingsStore = create<Store>(set => ({
	isShown: false,
	hide: () => set({ isShown: false }),
	Component: null,
	componentProps: {},
	type: 'constant_short',
	show: ({ componentProps, type, Component, data }) =>
		set({ isShown: true, componentProps, type, Component, data }),
	data: undefined,
	setData: data => set({ data }),
}))

export default useSettingsStore
