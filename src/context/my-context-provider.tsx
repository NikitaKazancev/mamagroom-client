'use client'

import { Language } from '@/i18n/types'
import { Roles } from '@/utils/auth/auth'
import { ReactNode } from 'react'
import { MyContext } from './my-context'

export function MyProvider({
	roles,
	language,
	children,
}: {
	roles: Roles
	language: Language
	children: ReactNode
}) {
	return (
		<MyContext.Provider value={{ roles, language }}>
			{children}
		</MyContext.Provider>
	)
}
