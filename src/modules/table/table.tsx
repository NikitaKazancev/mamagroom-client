'use client'

import { roleName, User } from '@/api/user/user.types'
import { formatDate } from '@/utils/functions'
import classNames from 'classnames'
import { useState } from 'react'
import styles from './table.module.scss'

type Props = {
	data: User[]
	columns: (keyof User)[]
	className?: string
}

const columnsNames = {
	name: 'Имя',
	email: 'Email',
	createdAt: 'Создан',
	updatedAt: 'Обновлен',
	roles: 'Права',
	id: 'ID',
	isDeleted: 'Удален',
	password: 'Пароль',
} as const

export const Table = ({ data, columns, className }: Props) => {
	const [expandedItem, setExpandedItem] = useState<User | null>(null)

	const header = (
		<thead className={styles.thead}>
			<tr>
				{columns.map(column => (
					<th key={column} scope='col'>
						<span>{columnsNames[column]}</span>
					</th>
				))}
			</tr>
		</thead>
	)

	const body = (
		<tbody className={styles.tbody}>
			{data.map(item => (
				<tr
					key={item.id}
					onClick={() =>
						setExpandedItem(expandedItem?.id === item.id ? null : item)
					}
				>
					{columns.map(column => {
						let value
						const itemData = item[column]
						if (column === 'createdAt' || column === 'updatedAt') {
							value = formatDate(itemData as Date)
						} else if (typeof itemData === 'string') {
							value = itemData
						} else if (typeof itemData === 'boolean') {
							value = itemData ? 'Да' : 'Нет'
						} else if (Array.isArray(itemData)) {
							value = (
								<div className={styles.itemsList}>
									{itemData.length > 3 ? (
										<>
											{itemData.slice(0, 2).map(role => (
												<span
													key={role}
													className={styles.itemsTag}
												>
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
						}

						return (
							<td key={column} scope='col'>
								<span>{value}</span>
							</td>
						)
					})}
				</tr>
			))}
		</tbody>
	)

	return (
		<div>
			<table
				className={classNames(styles.table, className, {
					[styles.expandedItemIsOpen]: expandedItem,
				})}
			>
				{header}
				{body}
			</table>

			{expandedItem && (
				<div className={styles.expandedItem}>
					{columns.map(column => {
						const itemData = expandedItem[column]
						if (Array.isArray(itemData)) {
							return (
								<div key={column}>
									<h4>{columnsNames[column]}</h4>
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
					})}
				</div>
			)}
		</div>
	)
}
