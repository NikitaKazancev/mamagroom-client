'use client'

import { HeaderNavbarLinkDto } from '@/api/header-navbar-link/header-navbar-link.api'
import {
	deleteHeaderNavbarLink,
	recoverHeaderNavbarLink,
} from '@/api/header-navbar-link/header-navbar-link.server'
import useSettingsStore, {
	SettingsFormAllData,
	SettingsFormComponent,
	SettingsFormData,
	SettingsFormType,
} from '@/modules/settings/utils/store'
import { CheckIcon } from '@/ui/icons/check/check'
import { ExitIcon } from '@/ui/icons/exit/exit'
import { SettingsIcon } from '@/ui/icons/settings/settings'
import classNames from 'classnames'
import styles from './settings.module.scss'

export const Settings = ({
	iconClassname,
	Component,
	componentProps,
	type,
	data,
	theme,
	isDeleted,
	allData,
}: {
	iconClassname?: string
	Component: SettingsFormComponent
	componentProps?: Record<string, any>
	type: SettingsFormType
	data?: SettingsFormData
	theme?: 'light' | 'dark'
	isDeleted?: boolean
	allData?: SettingsFormAllData
}) => {
	const { show } = useSettingsStore()

	const handleClick = () => {
		show({ componentProps, type, Component, data, allData })
	}

	const onDelete = () => {
		if (type === 'header-navbar-link') {
			deleteHeaderNavbarLink((data as HeaderNavbarLinkDto).id)
		}
	}

	const onRecover = () => {
		if (type === 'header-navbar-link') {
			recoverHeaderNavbarLink(data as HeaderNavbarLinkDto)
		}
	}

	if (isDeleted === undefined) {
		return (
			<SettingsIcon
				onClick={handleClick}
				className={classNames(styles.icon, iconClassname)}
				theme={theme}
			/>
		)
	}

	return (
		<div className={classNames(styles.wrapper, styles.icon, iconClassname)}>
			{isDeleted ? (
				<CheckIcon onClick={onRecover} />
			) : (
				<ExitIcon theme='red' onClick={onDelete} />
			)}
			<SettingsIcon onClick={handleClick} theme={theme} />
		</div>
	)
}
