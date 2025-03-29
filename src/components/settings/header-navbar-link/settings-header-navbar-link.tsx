import {
	HeaderNavbarLink,
	HeaderNavbarLinkDto,
} from '@/api/header-navbar-link/header-navbar-link.api'
import { Settings } from '@/modules/settings/settings'
import { Roles } from '@/utils/auth/auth'
import { SettingsHeaderNavbarLinkForm } from './settings-header-navbar-link-form'

export const SettingsHeaderNavbarLink = ({
	data,
	iconClassname,
	roles,
	theme,
	headerNavbarLinks,
	formTitle,
}: {
	data: HeaderNavbarLinkDto
	iconClassname?: string
	roles: Roles
	theme?: 'light' | 'dark'
	headerNavbarLinks: HeaderNavbarLink[]
	formTitle: string
}) => {
	if (!roles.headerNavbarLinkPut && !roles.headerNavbarLinkDelete) return null

	return (
		<Settings
			Component={SettingsHeaderNavbarLinkForm}
			iconClassname={iconClassname}
			type='header-navbar-link'
			data={data}
			theme={theme}
			isDeleted={data.isDeleted}
			headerNavbarLinks={headerNavbarLinks}
			formTitle={formTitle}
		/>
	)
}
