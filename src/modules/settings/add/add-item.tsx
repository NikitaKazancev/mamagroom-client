'use client'

import { HeaderNavbarLink } from '@/api/header-navbar-link/header-navbar-link.api'
import { Procedure } from '@/api/procedure/procedure.api'
import useSettingsStore, {
	SettingsFormComponent,
	SettingsFormData,
	SettingsFormType,
} from '@/modules/settings/utils/store'
import classNames from 'classnames'
import styles from './add-item.module.scss'

export const AddItem = ({
	Component,
	type,
	headerNavbarLinks,
	procedures,
	data,
	className,
	postRole,
	formTitle,
}: {
	Component: SettingsFormComponent
	type: SettingsFormType
	headerNavbarLinks?: HeaderNavbarLink[]
	procedures?: Procedure[]
	data: SettingsFormData
	className?: string
	postRole: boolean
	formTitle: string
}) => {
	const { show } = useSettingsStore()

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

	if (!postRole) return null

	return (
		<span className={classNames(styles.add, className)} onClick={handleClick}>
			+
		</span>
	)
}
