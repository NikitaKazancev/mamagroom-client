import { create } from 'zustand'

type Store = {
	isShown: boolean
	show: () => void
	hide: () => void
}

const useFullTransparentBlockStore = create<Store>(set => ({
	isShown: false,
	show: () => set({ isShown: true }),
	hide: () => set({ isShown: false }),
}))

export default useFullTransparentBlockStore
