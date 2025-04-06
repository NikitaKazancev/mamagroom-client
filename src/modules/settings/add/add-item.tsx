'use client'

import { HeaderNavbarLink } from '@/api/header-navbar-link/header-navbar-link.api'
import { Procedure } from '@/api/procedure/procedure.api'
import { useMyContext } from '@/context/my-context'
import useSettingsStore, {
	SettingsFormComponent,
	SettingsFormData,
	SettingsFormType,
} from '@/modules/settings/utils/store'
import { hasLanguageField } from '@/utils/functions'
import classNames from 'classnames'
import styles from './add-item.module.scss'

export const AddItem = ({
	Component,
	type,
	headerNavbarLinks,
	procedures,
	data,
	className,
	formTitle,
}: {
	Component: SettingsFormComponent
	type: SettingsFormType
	headerNavbarLinks?: HeaderNavbarLink[]
	procedures?: Procedure[]
	data: SettingsFormData
	className?: string
	formTitle: string
}) => {
	const { show } = useSettingsStore()

	const myContextData = useMyContext()
	const roles = myContextData.roles
	const language = myContextData.language

	if (type === 'breed' && !roles.breedPost) return null
	if (type === 'price' && !roles.pricePost) return null
	if (type === 'value' && !roles.valuePost) return null
	if (type === 'master' && !roles.masterPost) return null
	if (type === 'procedure' && !roles.procedurePost) return null
	if (type === 'vacancy' && !roles.vacancyPost) return null
	if (type === 'header-navbar-link' && !roles.headerNavbarLinkPost) return null
	if (type === 'main-slider' && !roles.mainSliderPost) return null
	if (type === 'file' && !roles.filePostPut) return null

	if (hasLanguageField(data)) {
		data.language = language
	}

	const handleClick = () => {
		show({
			type,
			Component,
			headerNavbarLinks,
			procedures,
			data,
			method: 'post',
			formTitle,
		})
	}

	return (
		<span className={classNames(styles.add, className)} onClick={handleClick}>
			+
		</span>
	)
}
