'use client'

import { Procedure, procedureApi } from '@/api/procedure/procedure.api'
import { Button } from '@/ui/button/button'
import { ExitIcon } from '@/ui/icons/exit/exit'
import { LoadingIcon } from '@/ui/icons/loading/loading'
import { Input } from '@/ui/input/input'
import { TextArea } from '@/ui/textarea/textarea'
import classNames from 'classnames'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import styles from './procedure-selection.module.scss'

export const ProcedureSelection = () => {
	const [isOpen, setIsOpen] = useState(false)
	const [loading, setLoading] = useState(false)
	const [dataFromAI, setDataFromAI] = useState<{
		procedures: Procedure[]
		breedId: string
	}>({ procedures: [], breedId: '' })
	const [description, setDescription] = useState('')

	const router = useRouter()

	const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		setLoading(true)
		const formData = new FormData(e.currentTarget)

		const data = await procedureApi.findByUserData(formData)
		setDataFromAI(data)
		setLoading(false)
	}

	const clearData = () => {
		setDataFromAI({ procedures: [], breedId: '' })
	}

	if (!isOpen)
		return (
			<div
				className={styles.main}
				onClick={() => {
					if (!isOpen) setIsOpen(true)
				}}
			>
				Подбор услуг
			</div>
		)

	let content = null
	if (!dataFromAI.breedId) {
		content = (
			<form onSubmit={onSubmit} className={styles.form}>
				<TextArea
					name='description'
					onChange={e => setDescription(e.target.value)}
					value={description}
					title='Описание питомца'
					required
					className={styles.textarea}
				/>
				<Input
					name='file'
					title='Картинка питомца'
					type='file'
					className={styles.input}
				/>
				<Button
					theme='dark'
					text='Подобрать'
					className={styles.button}
					Icon={loading ? <LoadingIcon /> : null}
				/>
			</form>
		)
	} else {
		content = (
			<div className={styles.procedures}>
				<ul>
					{dataFromAI.procedures.map(procedure => (
						<li key={procedure.id}>
							{procedure.name}
							<Button
								theme='dark'
								text='Подробнее'
								onClick={() => {
									router.replace(`/dogs/${dataFromAI.breedId}#prices`)
									setIsOpen(false)
									clearData()
								}}
							/>
						</li>
					))}
				</ul>
				<Button
					theme='dark'
					text='Назад'
					className={styles.button}
					onClick={() => clearData()}
				/>
			</div>
		)
	}

	return (
		<div className={classNames(styles.main, styles.open)}>
			<div className={styles.header}>
				<h4>Подбор услуг</h4>
				<ExitIcon
					onClick={() => {
						if (isOpen) setIsOpen(false)
					}}
					className={styles.exit}
				/>
			</div>
			{content}
		</div>
	)
}
