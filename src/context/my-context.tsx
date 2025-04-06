'use client'

import { Language } from '@/i18n/types'
import { Roles } from '@/utils/auth/auth'
import { createContext, useContext } from 'react'

type MyContextData = {
	language: Language
	roles: Roles
}

export const MyContext = createContext<MyContextData | null>(null)

export const useMyContext = (): MyContextData => {
	const ctx = useContext(MyContext)
	if (!ctx)
		throw new Error('useMyContext must be used within <GeneralDataProvider>')
	return ctx
}
