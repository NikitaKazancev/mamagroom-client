import { MainSliderDto } from '@/api/main-slider/main-slider.api'
import { Settings } from '@/modules/settings/settings'
import { Roles } from '@/utils/auth/auth'
import { SettingsMainSliderForm } from './main-slider-form'

export const SettingsMainSlider = ({
	data,
	iconClassname,
	roles,
	theme,
}: {
	data: MainSliderDto
	iconClassname?: string
	roles: Roles
	theme?: 'light' | 'dark'
}) => {
	if (!roles.mainSliderPut && !roles.mainSliderDelete) return null

	return (
		<Settings
			Component={SettingsMainSliderForm}
			iconClassname={iconClassname}
			type='main-slider'
			data={data}
			theme={theme}
			isDeleted={data.isDeleted}
		/>
	)
}
