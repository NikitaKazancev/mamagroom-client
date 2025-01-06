import { ComponentType } from 'react'
import { create } from 'zustand'

export type Store = {
	isShown: boolean
	hide: () => void
	Component: ComponentType<any> | null
	componentProps: Record<string, any>
	data: any
	type: string
	show: ({
		componentProps,
		type,
		Component,
		data,
	}: {
		Component: ComponentType
		componentProps: Record<string, any>
		type: string
		data: any
	}) => void
	setData: (data: any) => void
}

const useSettingsStore = create<Store>(set => ({
	isShown: false,
	hide: () => set({ isShown: false }),
	Component: null,
	componentProps: {},
	type: 'constant',
	show: ({ componentProps, type, Component, data }) =>
		set({ isShown: true, componentProps, type, Component, data }),
	data: {},
	setData: data => set({ data }),
}))

export default useSettingsStore
