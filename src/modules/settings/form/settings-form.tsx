'use client'

import { login } from '@/api/auth/auth.server'
import { BreedDto } from '@/api/breed/breed.api'
import { postBreed, putBreed } from '@/api/breed/breed.server'
import { putConstant } from '@/api/constant/constant.server'
import { ConstantDto } from '@/api/constant/constant.types'
import { postFile } from '@/api/file/file.server'
import { HeaderNavbarLinkDto } from '@/api/header-navbar-link/header-navbar-link.api'
import {
	postHeaderNavbarLink,
	putHeaderNavbarLink,
} from '@/api/header-navbar-link/header-navbar-link.server'
import { MainSliderDto } from '@/api/main-slider/main-slider.api'
import {
	postMainSlider,
	putMainSlider,
} from '@/api/main-slider/main-slider.server'
import { PriceDto } from '@/api/price/price.api'
import { postPrice, putPrice } from '@/api/price/price.server'
import { ProcedureDto } from '@/api/procedure/procedure.api'
import { postProcedure } from '@/api/procedure/procedure.server'
import { ValueDto } from '@/api/values/values.api'
import { postValue, putValue } from '@/api/values/values.server'
import { AuthFormBtns } from '@/modules/auth/auth-form-btns'
import { Button } from '@/ui/button/button'
import { ExitIcon } from '@/ui/icons/exit/exit'
import { setToken } from '@/utils/cookies/cookies-client.api'
import classNames from 'classnames'
import { useRef } from 'react'
import toast from 'react-hot-toast'
import useSettingsStore, { SettingsFormResultType } from '../utils/store'
import styles from './settings-form.module.scss'

export const SettingsForm = () => {
	const {
		hide,
		isShown,
		componentProps,
		type,
		Component,
		data,
		headerNavbarLinks,
		procedures,
		setData,
		method,
		formTitle,
	} = useSettingsStore()

	const form = useRef<HTMLFormElement>(null)

	let formElems: {
		buttonText: string
	} = { buttonText: 'Сохранить' }
	if (type === 'auth') {
		formElems = { buttonText: 'Войти' }
	}

	const closeAndClearForm = () => {
		if (form.current) form.current.reset()
		hide()
	}

	const onWrapperClick = (e: React.MouseEvent<HTMLDivElement>) => {
		if (e.target === e.currentTarget) {
			closeAndClearForm()
		}
	}

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		const formData = new FormData(e.currentTarget)

		if (type === 'auth') {
			await toast.promise(login(formData), {
				loading: 'Авторизация...',
				success: data => {
					if (!data) throw new Error('Неверные данные')
					setToken(data)
					closeAndClearForm()
					return 'Авторизация прошла успешно'
				},
				error: error => {
					return error.message || 'Неверные данные'
				},
			})

			return
		}

		const toastId = toast.loading('Загрузка...')
		let result: SettingsFormResultType = undefined
		if (type === 'file') {
			postFile(formData)
			result = 'true'
		} else if (type && type.startsWith('constant')) {
			result = await putConstant(formData, data as ConstantDto)
		} else if (type === 'header-navbar-link') {
			if (method === 'post') {
				result = await postHeaderNavbarLink(
					formData,
					data as HeaderNavbarLinkDto
				)
			} else {
				result = await putHeaderNavbarLink(
					formData,
					data as HeaderNavbarLinkDto
				)
			}
		} else if (type === 'value') {
			if (method === 'post') {
				result = await postValue(formData)
			} else {
				result = await putValue(formData, data as ValueDto)
			}
		} else if (type === 'main-slider') {
			if (method === 'post') {
				result = await postMainSlider(formData)
			} else {
				result = await putMainSlider(formData, data as MainSliderDto)
			}
		} else if (type === 'breed') {
			if (method === 'post') {
				result = await postBreed(formData, data as BreedDto)
			} else {
				result = await putBreed(formData, data as BreedDto)
			}
		} else if (type === 'price') {
			if (method === 'post') {
				result = await postPrice(formData, data as PriceDto)
			} else {
				result = await putPrice(formData, data as PriceDto)
			}
		} else if (type === 'procedure') {
			if (method === 'post') {
				result = await postProcedure(formData, data as ProcedureDto)
			}
		}

		if (!result) {
			toast.error(
				'Произошла ошибка.\nСкорее всего такой элемент уже существует',
				{
					id: toastId,
				}
			)
		} else {
			toast.success('Данные успешно сохранены', {
				id: toastId,
			})
			closeAndClearForm()
		}
	}

	return (
		<div
			className={classNames(styles.wrapper, !isShown && styles.hide)}
			onDoubleClick={onWrapperClick}
		>
			<div className={styles.main}>
				<div className={styles.header}>
					<h2 className={styles.title}>{formTitle}</h2>
					<ExitIcon className={styles.exit} theme='dark' onClick={hide} />
				</div>
				<form onSubmit={handleSubmit} className={styles.form} ref={form}>
					{Component && (
						<Component
							{...componentProps}
							data={data}
							setData={setData}
							type={type}
							headerNavbarLinks={headerNavbarLinks}
							procedures={procedures}
							method={method}
							formTitle={formTitle}
						/>
					)}
					<div className={styles.buttons}>
						{type === 'auth' && (
							<div className={styles.leftBtns}>
								<AuthFormBtns btnStyle={styles.btn} />
							</div>
						)}
						<Button
							className={styles.btn}
							text={formElems.buttonText}
							theme='dark'
						/>
					</div>
				</form>
			</div>
		</div>
	)
}
