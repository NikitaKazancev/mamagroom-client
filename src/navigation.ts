import { createSharedPathnamesNavigation } from 'next-intl/navigation'
import { locales } from './i18n'

export const {
	Link: LinkLocale,
	redirect,
	usePathname,
	useRouter,
} = createSharedPathnamesNavigation({ locales /* ... */ })
