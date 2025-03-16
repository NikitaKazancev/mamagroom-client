'use client'

import { Breed } from '@/api/breed/breed.api'
import { deleteBreed, recoverBreed } from '@/api/breed/breed.server'
import {
	HeaderNavbarLink,
	HeaderNavbarLinkDto,
} from '@/api/header-navbar-link/header-navbar-link.api'
import {
	deleteHeaderNavbarLink,
	recoverHeaderNavbarLink,
} from '@/api/header-navbar-link/header-navbar-link.server'
import { MainSlider } from '@/api/main-slider/main-slider.api'
import {
	deleteMainSlider,
	recoverMainSlider,
} from '@/api/main-slider/main-slider.server'
import { Price } from '@/api/price/price.api'
import { deletePrice, recoverPrice } from '@/api/price/price.server'
import { Procedure } from '@/api/procedure/procedure.api'
import { ValueDto } from '@/api/values/values.api'
import { deleteValue, recoverValue } from '@/api/values/values.server'
import useSettingsStore, {
	SettingsFormComponent,
	SettingsFormData,
	SettingsFormType,
} from '@/modules/settings/utils/store'
import { CheckIcon } from '@/ui/icons/check/check'
import { ExitIcon } from '@/ui/icons/exit/exit'
import { SettingsIcon } from '@/ui/icons/settings/settings'
import classNames from 'classnames'
import toast from 'react-hot-toast'
import styles from './settings.module.scss'

export const Settings = ({
	iconClassname,
	Component,
	componentProps,
	type,
	data,
	theme,
	isDeleted,
	headerNavbarLinks,
	procedures,
}: {
	iconClassname?: string
	Component: SettingsFormComponent
	componentProps?: Record<string, any>
	type: SettingsFormType
	data?: SettingsFormData
	theme?: 'light' | 'dark'
	isDeleted?: boolean
	headerNavbarLinks?: HeaderNavbarLink[]
	procedures?: Procedure[]
}) => {
	const { show } = useSettingsStore()

	const handleClick = () => {
		show({
			componentProps,
			type,
			Component,
			data,
			headerNavbarLinks,
			procedures,
			method: 'put',
		})
	}

	const onDelete = async () => {
		const toastId = toast.loading('Удаление...')
		if (type === 'header-navbar-link') {
			await deleteHeaderNavbarLink((data as HeaderNavbarLinkDto).id)
		} else if (type === 'value') {
			await deleteValue((data as ValueDto).id)
		} else if (type === 'main-slider') {
			await deleteMainSlider((data as MainSlider).id)
		} else if (type === 'breed') {
			await deleteBreed((data as Breed).id)
		} else if (type === 'price') {
			await deletePrice((data as Price).id)
		}

		toast.success('Помечено на удаление', {
			id: toastId,
		})
	}

	const onRecover = async () => {
		const toastId = toast.loading('Восстановление...')
		if (type === 'header-navbar-link') {
			await recoverHeaderNavbarLink(data as HeaderNavbarLinkDto)
		} else if (type === 'value') {
			await recoverValue(data as ValueDto)
		} else if (type === 'main-slider') {
			await recoverMainSlider(data as MainSlider)
		} else if (type === 'breed') {
			await recoverBreed(data as Breed)
		} else if (type === 'price') {
			await recoverPrice(data as Price)
		}

		toast.success('Восстановлено', {
			id: toastId,
		})
	}

	if (isDeleted === undefined) {
		return (
			<SettingsIcon
				onClick={handleClick}
				className={classNames(styles.wrapper, iconClassname)}
				theme={theme}
			/>
		)
	}

	return (
		<div className={classNames(styles.wrapper, iconClassname)}>
			{isDeleted ? (
				<CheckIcon onClick={onRecover} />
			) : (
				<ExitIcon theme='red' onClick={onDelete} />
			)}
			<SettingsIcon onClick={handleClick} theme={theme} />
		</div>
	)
}
