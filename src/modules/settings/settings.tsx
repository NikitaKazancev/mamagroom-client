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
import { Master } from '@/api/master/master.api'
import { deleteMaster, recoverMaster } from '@/api/master/master.server'
import { Price } from '@/api/price/price.api'
import { deletePrice, recoverPrice } from '@/api/price/price.server'
import { Procedure } from '@/api/procedure/procedure.api'
import { Vacancy } from '@/api/vacancy/vacancy.api'
import { deleteVacancy, recoverVacancy } from '@/api/vacancy/vacancy.server'
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

export const isSettingElem = (elem: HTMLElement, containerClass: string) => {
	if (!elem) return false

	let parent = elem
	while (
		parent &&
		!parent.classList.contains(containerClass) &&
		parent !== document.body
	) {
		for (let i = 0; i < parent.classList.length; i++) {
			const className = parent.classList[i]
			if (className.startsWith('settings')) return true
			if (className.startsWith('add-item')) return true
		}
		parent = parent.parentElement as HTMLElement
	}

	return false
}

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
	formTitle,
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
	formTitle: string
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
			formTitle,
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
		} else if (type === 'master') {
			await deleteMaster((data as Master).id)
		} else if (type === 'vacancy') {
			await deleteVacancy((data as Vacancy).id)
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
		} else if (type === 'master') {
			await recoverMaster(data as Master)
		} else if (type === 'vacancy') {
			await recoverVacancy(data as Vacancy)
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
				<CheckIcon onClick={onRecover} theme={theme} />
			) : (
				<ExitIcon theme={theme} onClick={onDelete} />
			)}
			<SettingsIcon onClick={handleClick} theme={theme} />
		</div>
	)
}
