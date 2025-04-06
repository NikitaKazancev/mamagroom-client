import { MainSliderDto } from '@/api/main-slider/main-slider.api'
import { useMyContext } from '@/context/my-context'
import { Settings } from '@/modules/settings/settings'
import { SettingsMainSliderForm } from './main-slider-form'

export const SettingsMainSlider = ({
	data,
	iconClassname,
	theme,
	formTitle,
}: {
	data: MainSliderDto
	iconClassname?: string
	theme?: 'light' | 'dark'
	formTitle: string
}) => {
	const roles = useMyContext().roles
	if (!roles.mainSliderPut && !roles.mainSliderDelete) return null

	return (
		<Settings
			Component={SettingsMainSliderForm}
			iconClassname={iconClassname}
			type='main-slider'
			data={data}
			theme={theme}
			isDeleted={data.isDeleted}
			formTitle={formTitle}
		/>
	)
}
