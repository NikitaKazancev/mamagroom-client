'use client'

import useSettingsStore from '@/modules/settings/utils/store'
import { SettingsIcon } from '@/ui/icons/settings/settings'
import classNames from 'classnames'
import { ComponentType } from 'react'
import styles from './settings.module.scss'

export const Settings = ({
	iconClassname,
	Component,
	componentProps,
	type,
	data,
}: {
	iconClassname?: string
	Component: ComponentType
	componentProps: Record<string, any>
	type: string
	data: any
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
