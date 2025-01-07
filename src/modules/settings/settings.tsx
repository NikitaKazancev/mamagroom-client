'use client'

import useSettingsStore, {
	SettingsFormComponent,
	SettingsFormData,
	SettingsFormType,
} from '@/modules/settings/utils/store'
import { SettingsIcon } from '@/ui/icons/settings/settings'
import classNames from 'classnames'
import styles from './settings.module.scss'

export const Settings = ({
	iconClassname,
	Component,
	componentProps,
	type,
	data,
}: {
	iconClassname?: string
	Component: SettingsFormComponent
	componentProps?: Record<string, any>
	type: SettingsFormType
	data?: SettingsFormData
}) => {
	const { show } = useSettingsStore()

	const handleClick = () => {
		show({ componentProps, type, Component, data })
	}

	return (
		<SettingsIcon
			onClick={handleClick}
			className={classNames(styles.icon, iconClassname)}
		/>
	)
}
