import { ComponentType } from 'react'
import { create } from 'zustand'

export type Store = {
	isShown: boolean
	show: ({
		Component,
		onSubmit,
		componentProps,
	}: {
		Component: ComponentType
		onSubmit: (formData: FormData) => void
		componentProps: Record<string, any>
	}) => void
	hide: () => void
	Component: ComponentType | null
	componentProps: Record<string, any>
	onSubmit: (formData: FormData) => void
}

const useSettingsStore = create<Store>(set => ({
	isShown: false,
	show: ({ Component, componentProps, onSubmit }) =>
		set({ Component, componentProps, onSubmit, isShown: true }),
	hide: () => set({ isShown: false }),
	Component: null,
	componentProps: {},
	onSubmit: () => {},
}))

export default useSettingsStore
