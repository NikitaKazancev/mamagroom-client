import { PriceDto } from '@/api/price/price.api'
import { Procedure } from '@/api/procedure/procedure.api'
import { Settings } from '@/modules/settings/settings'
import { Roles } from '@/utils/auth/auth'
import { SettingsPriceForm } from './prices-form'

export const SettingsPrice = ({
	data,
	iconClassname,
	roles,
	theme,
	procedures,
	formTitle,
}: {
	data: PriceDto
	iconClassname?: string
	roles: Roles
	theme?: 'light' | 'dark'
	procedures: Procedure[]
	formTitle: string
}) => {
	if (!roles.pricePut && !roles.priceDelete) return null

	return (
		<Settings
			Component={SettingsPriceForm}
			iconClassname={iconClassname}
			type='price'
			data={data}
			theme={theme}
			isDeleted={data.isDeleted}
			procedures={procedures}
			formTitle={formTitle}
		/>
	)
}
