'use client'

import { Price } from '@/api/price/price.api'
import { Procedure } from '@/api/procedure/procedure.api'
import { roleName, User } from '@/api/user/user.types'
import { SettingsPrice } from '@/components/settings/prices/prices-link'
import { formatDate, minutesToHours } from '@/utils/functions'
import { GeneralProps } from '@/utils/types'
import classNames from 'classnames'
import { useState } from 'react'
import styles from './table.module.scss'

export type MergedPrice = Omit<Price, 'price' | 'weight' | 'time'> & {
	price: number[]
	weight: number[]
	time: number[]
}

type Props =
	| {
			data: User[]
			columns: (keyof User)[]
			className?: string
			generalProps: GeneralProps
	  }
	| {
			data: MergedPrice[]
			columns: (keyof MergedPrice)[]
			className?: string
			generalProps: GeneralProps
			procedures: Procedure[]
	  }

const userColumnsNames = {
	name: 'Имя',
	email: 'Email',
	createdAt: 'Создан',
	updatedAt: 'Обновлен',
	roles: 'Права',
	id: 'ID',
	isDeleted: 'Удален',
	password: 'Пароль',
} as const

const priceColumnsNames = {
	procedure: 'Процедура',
	time: 'Время',
	price: 'Цена (₽)',
	weight: 'Вес (кг)',
} as const

const itIsUser = (item: User | MergedPrice): item is User => {
	return 'roles' in item
}

const itIsPrice = (item: User | MergedPrice): item is MergedPrice => {
	return 'price' in item
}

export const Table = ({
	data,
	columns,
	className,
	generalProps,
	...props
}: Props) => {
	const [expandedItem, setExpandedItem] = useState<User | null>(null)

	const isUser = itIsUser(data[0])
	const isPrice = itIsPrice(data[0])

	const columnsNames = isPrice
		? priceColumnsNames
		: isUser
		? userColumnsNames
		: {}

	const header = (
		<thead className={styles.thead}>
			<tr>
				{columns.map(column => (
					<th key={column} scope='col'>
						<span>
							{columnsNames[column as keyof typeof columnsNames]}
						</span>
					</th>
				))}
			</tr>
		</thead>
	)

	const handleClickOnTr = (item: User | MergedPrice) => {
		if (isUser) {
			setExpandedItem(item as User)
		}
	}

	const dataByColumn = (
		item: User | MergedPrice,
		column: keyof User | keyof MergedPrice
	) => {
		let value
		const itemData = item[column as keyof typeof item]
		if (column === 'createdAt' || column === 'updatedAt') {
			value = formatDate(itemData as Date)
		} else if (column === 'procedure') {
			value = (itemData as unknown as { name: string }).name
		} else if (column === 'weight' && Array.isArray(itemData)) {
			value = itemData.join(' / ')
		} else if (column === 'time' && Array.isArray(itemData)) {
			value = itemData.map(data => minutesToHours(data)).join(' / ')
		} else if (typeof itemData === 'boolean') {
			value = itemData ? 'Да' : 'Нет'
		} else if (column === 'price' && Array.isArray(itemData)) {
			const weight = item[
				'weight' as keyof typeof item
			] as unknown as number[]

			if (weight.length > 1) {
				value = (
					<div className={styles.textList}>
						<span>{itemData.join(' / ')}</span>
						<span>({weight.map(w => `${w}кг`).join(' / ')})</span>
					</div>
				)
			} else {
				value = itemData.join(' / ')
			}
		} else if (column === 'roles' && Array.isArray(itemData)) {
			value = (
				<div className={styles.itemsList}>
					{itemData.length > 3 ? (
						<>
							{(itemData as any[]).slice(0, 2).map(role => (
								<span key={role} className={styles.itemsTag}>
									{roleName(role)}
								</span>
							))}
							<span className={styles.moreItemsTag}>
								еще +{itemData.length - 2}
							</span>
						</>
					) : (
						itemData.map(role => (
							<span key={role} className={styles.itemsTag}>
								{roleName(role)}
							</span>
						))
					)}
				</div>
			)
		} else if (typeof itemData === 'number' || typeof itemData === 'string') {
			value = itemData
		}

		return (
			<td key={column} scope='col'>
				<span>{value}</span>
			</td>
		)
	}

	const body = (
		<tbody
			className={classNames(styles.tbody, {
				[styles.isUser]: isUser,
				[styles.isPrice]: isPrice,
			})}
		>
			{data.map((item, index) => (
				<tr key={index} onClick={() => handleClickOnTr(item)}>
					{columns.map(column => dataByColumn(item, column))}
				</tr>
			))}
		</tbody>
	)

	let expandedItemBody = null
	if (expandedItem) {
		const list = columns.map(column => {
			const itemData = expandedItem[column as keyof typeof expandedItem]
			if (Array.isArray(itemData)) {
				return (
					<div key={column}>
						<h4>{columnsNames[column as keyof typeof columnsNames]}</h4>
						<div className={styles.expandedItemGrid}>
							{itemData.map(role => (
								<div
									key={role}
									className={styles.expandedItemGridValue}
								>
									{roleName(role)}
								</div>
							))}
						</div>
					</div>
				)
			}
		})

		if (list.filter(Boolean).length > 0) {
			expandedItemBody = list
		} else {
			expandedItemBody = <div>Нет дополнительной информации</div>
		}
	}

	return (
		<div className='relative'>
			<table
				className={classNames(styles.table, className, {
					[styles.expandedItemIsOpen]: expandedItem,
				})}
			>
				{header}
				{body}
			</table>

			{expandedItem && (
				<div className={styles.expandedItem}>{expandedItemBody}</div>
			)}

			{isPrice && (
				<div className={styles.settingsWrapper}>
					{data.map((item, index) => (
						<SettingsPrice
							data={{
								...item,
								price: (item as MergedPrice).price[0],
								weight: (item as MergedPrice).weight[0],
								time: (item as MergedPrice).time[0],
								breedId: (item as MergedPrice).breedId,
								procedureId: (item as MergedPrice).procedure.id,
							}}
							roles={generalProps.roles}
							key={index}
							iconClassname={styles.settings}
							procedures={(props as any).procedures}
							theme='dark'
						/>
					))}
				</div>
			)}
		</div>
	)
}
