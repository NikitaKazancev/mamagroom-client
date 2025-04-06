'use client'

import { PriceDto } from '@/api/price/price.api'
import { Procedure } from '@/api/procedure/procedure.api'
import { Settings } from '@/modules/settings/settings'
import { SettingsPriceForm } from './prices-form'
import { useMyContext } from '@/context/my-context'

export const SettingsPrice = ({
	data,
	iconClassname,
	theme,
	procedures,
	formTitle,
}: {
	data: PriceDto
	iconClassname?: string
	theme?: 'light' | 'dark'
	procedures: Procedure[]
	formTitle: string
}) => {
	const roles = useMyContext().roles
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
