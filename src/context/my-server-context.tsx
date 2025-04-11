import { Language } from '@/i18n/types'
import { rolesFromHeader } from '@/utils/auth/auth'
import { getToken } from '@/utils/cookies/cookies-server.api'
import { useLocale, useTranslations } from 'next-intl'
import { getLocale, getTranslations } from 'next-intl/server'
import { cache } from 'react'

export const useRoles = cache(rolesFromHeader)
export const useToken = cache(getToken)

export const useLanguage = cache(useLocale) as () => Language
export const getLanguage = cache(getLocale) as () => Promise<Language>

export const getTranslation = cache(getTranslations)
export const useTranslation = cache(useTranslations)
