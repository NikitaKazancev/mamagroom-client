import { create } from 'zustand'

type Store = {
	isShown: boolean
	message: string
	buttonTitle?: string
	show: (params: {
		message: string
		buttonTitle?: string
		onClick?: () => void
	}) => void
	hide: () => void
	onClick?: () => void
}

const usePopUpStore = create<Store>(set => ({
	isShown: false,
	message: '',
	buttonTitle: '',
	show: ({ message, buttonTitle, onClick }) =>
		set({ isShown: true, message, buttonTitle, onClick }),
	hide: () => set({ isShown: false }),
}))

export default usePopUpStore
