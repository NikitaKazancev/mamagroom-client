import { HeaderNavbarLinkDto } from '@/api/header-navbar-link/header-navbar-link.api'
import { Settings } from '@/modules/settings/settings'
import { Roles } from '@/utils/auth/auth'
import { SettingsHeaderNavbarLinkForm } from './settings-header-navbar-link-form'

export const SettingsHeaderNavbarLink = ({
	children,
	data,
	iconClassname,
	roles,
	theme,
}: {
	children: React.ReactNode
	data: HeaderNavbarLinkDto
	iconClassname?: string
	roles: Roles
	theme?: 'light' | 'dark'
}) => {
	return (
		<div className='relative'>
			{children}
			{(roles.headerNavbarLinkPut || roles.headerNavbarLinkDelete) && (
				<Settings
					Component={SettingsHeaderNavbarLinkForm}
					iconClassname={iconClassname}
					type='header-navbar-link'
					data={data}
					theme={theme}
					isDeleted={data.isDeleted}
				/>
			)}
		</div>
	)
}
