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
import { MasterDto } from '@/api/master/master.api'
import { postMaster, putMaster } from '@/api/master/master.server'
import { PriceDto } from '@/api/price/price.api'
import { postPrice, putPrice } from '@/api/price/price.server'
import { ProcedureDto } from '@/api/procedure/procedure.api'
import { postProcedure } from '@/api/procedure/procedure.server'
import { ReviewDto } from '@/api/review/review.api'
import { postReview, putReview } from '@/api/review/review.server'
import { VacancyDto } from '@/api/vacancy/vacancy.api'
import { postVacancy, putVacancy } from '@/api/vacancy/vacancy.server'
import { ValueDto } from '@/api/values/values.api'
import { postValue, putValue } from '@/api/values/values.server'
import { useRouter } from '@/i18n/routing'
import { AuthFormBtns } from '@/modules/auth/auth-form-btns'
import { Button } from '@/ui/button/button'
import { ExitIcon } from '@/ui/icons/exit/exit'
import { setToken } from '@/utils/cookies/cookies-client.api'
import myToast from '@/utils/dynamics/toast'
import { compressImage, isFileReceived } from '@/utils/functions'
import classNames from 'classnames'
import { useRef } from 'react'
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
	const router = useRouter()

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
		const toast = await myToast()

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

			router.refresh()
			return
		}

		const toastId = toast.loading('Загрузка...')
		let result: SettingsFormResultType = undefined

		if (type === 'file') {
			if (!isFileReceived(formData)) {
				toast.dismiss(toastId)
				result = undefined
			} else {
				await compressImage(formData, toastId)
				toast.loading('Отправка файла...', {
					id: toastId,
				})
				await postFile(formData)
				result = 'true'
			}
		} else if (type && type.startsWith('constant')) {
			result = await putConstant(formData, data as ConstantDto)
		} else if (type === 'header-navbar-link') {
			if (formData.get('parentLinkId')) {
				formData.delete('parentLinkId')
			}

			if (method === 'post') {
				if (formData.get('order') === '') {
					formData.delete('order')
				}

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
			if (isFileReceived(formData)) {
				await compressImage(formData, toastId)
			} else {
				formData.delete('file')
			}

			if (method === 'post') {
				if (formData.get('order') === '') {
					formData.delete('order')
				}

				result = await postValue(formData)
			} else {
				result = await putValue(formData, data as ValueDto)
			}
		} else if (type === 'main-slider') {
			if (isFileReceived(formData)) {
				await compressImage(formData, toastId)
			} else {
				formData.delete('file')
			}

			if (method === 'post') {
				if (formData.get('order') === '') {
					formData.delete('order')
				}

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
		} else if (type === 'master') {
			if (isFileReceived(formData)) {
				await compressImage(formData, toastId)
			} else {
				formData.delete('file')
			}

			if (method === 'post') {
				result = await postMaster(formData)
			} else {
				result = await putMaster(formData, data as MasterDto)
			}
		} else if (type === 'vacancy') {
			if (method === 'post') {
				result = await postVacancy(formData, data as VacancyDto)
			} else {
				result = await putVacancy(formData, data as VacancyDto)
			}
		} else if (type === 'review') {
			if (method === 'post') {
				result = await postReview(formData, data as ReviewDto)
			} else {
				result = await putReview(formData, data as ReviewDto)
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

		router.refresh()
	}

	return (
		<div
			className={classNames(styles.wrapper, !isShown && styles.hide)}
			onDoubleClick={onWrapperClick}
		>
			<aside className={styles.main}>
				<div className={styles.header}>
					<h3 className={styles.title}>{formTitle}</h3>
					<button>
						<ExitIcon
							className={styles.exit}
							theme='dark'
							onClick={hide}
						/>
					</button>
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
			</aside>
		</div>
	)
}
