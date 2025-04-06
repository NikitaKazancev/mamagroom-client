import {
	HeaderNavbarLink,
	HeaderNavbarLinkDto,
} from '@/api/header-navbar-link/header-navbar-link.api'
import { useMyContext } from '@/context/my-context'
import { Settings } from '@/modules/settings/settings'
import { SettingsHeaderNavbarLinkForm } from './settings-header-navbar-link-form'

export const SettingsHeaderNavbarLink = ({
	data,
	iconClassname,
	theme,
	headerNavbarLinks,
	formTitle,
}: {
	data: HeaderNavbarLinkDto
	iconClassname?: string
	theme?: 'light' | 'dark'
	headerNavbarLinks: HeaderNavbarLink[]
	formTitle: string
}) => {
	const roles = useMyContext().roles
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
