'use client'

import { Breed } from '@/api/breed/breed.api'
import { SettingsBreedForm } from '@/components/settings/breeds/breeds-form'
import { SettingsBreed } from '@/components/settings/breeds/breeds-link'
import { Input } from '@/ui/input/input'
import { GeneralProps } from '@/utils/types'
import classNames from 'classnames'
import Link from 'next/link'
import { useMemo, useState } from 'react'
import { AddItem } from '../settings/add/add-item'
import styles from './breeds.module.scss'

const getBreedsByFirstLetter = (breeds: Breed[]) => {
	const res: Map<string, Breed[]> = new Map()

	for (const breed of breeds) {
		const firstLetter = breed.name.slice(0, 1)
		if (!res.has(firstLetter)) {
			res.set(firstLetter, [])
		}
		res.get(firstLetter)?.push(breed)
	}

	return res
}

const getFirstLetters = (breeds: Breed[]) => {
	const res: string[] = []

	for (const breed of breeds) {
		const firstLetter = breed.name.slice(0, 1)
		if (!res.includes(firstLetter)) {
			res.push(firstLetter)
		}
	}

	return res
}

const breedTypeName = {
	smallDog: 'Мелкие',
	mediumDog: 'Средние',
	bigDog: 'Крупные',
}

type Props = {
	breeds: Breed[]
	type: 'dogs' | 'cats'
	generalProps: GeneralProps
}

export const BreedsClient = ({ breeds, type, generalProps }: Props) => {
	const [search, setSearch] = useState('')
	const [filterType, setFilterType] = useState('')

	const filteredBreeds = useMemo(() => {
		return breeds.filter(
			breed =>
				breed.name.toLowerCase().includes(search.toLowerCase()) &&
				(filterType ? breed.type === filterType : true)
		)
	}, [search, filterType, breeds])

	const firstLetters = useMemo(
		() => getFirstLetters(filteredBreeds).sort(),
		[filteredBreeds]
	)
	const breedsByFirstLetter = useMemo(
		() => getBreedsByFirstLetter(filteredBreeds),
		[filteredBreeds]
	)

	const onSearch = (e: any) => {
		setSearch(e.target.value)
	}

	let filters = undefined
	if (type === 'dogs') {
		filters = (
			<div className={styles.filters}>
				<div className={styles.breedTypes}>
					{(['smallDog', 'mediumDog', 'bigDog'] as const).map(type => (
						<button
							key={type}
							className={`${styles.filterButton} ${
								filterType === type ? styles.active : ''
							}`}
							onClick={() =>
								setFilterType(filterType === type ? '' : type)
							}
						>
							{breedTypeName[type]}
						</button>
					))}
					<AddItem
						type='breed'
						Component={SettingsBreedForm}
						data={{ id: '', name: '', type: 'smallDog' }}
						postRole={generalProps.roles.breedPost}
					/>
				</div>
				<Input
					name='search'
					title='Поиск:'
					value={search}
					onChange={onSearch}
					theme='main'
					placeholder='Алабай...'
				/>
			</div>
		)
	}

	return (
		<>
			{filters}
			<ul className={classNames(styles.list, styles[type])}>
				{firstLetters.map((letter, i) => (
					<li key={letter} className={styles.item}>
						{type === 'cats' ? (
							i !== 0 && <div className={styles.line}></div>
						) : (
							<div className={styles.line}></div>
						)}
						<div className={styles.title}>{letter}</div>
						<ul className={styles.breeds}>
							{breedsByFirstLetter.get(letter)?.map(breed => (
								<li key={breed.id} className={styles.breed}>
									<Link href={`/${type}/${breed.id}#prices`}>
										<span>{breed.name}</span>
									</Link>
									<SettingsBreed
										data={breed}
										roles={generalProps.roles}
										theme='dark'
										iconClassname={styles.settings}
									/>
								</li>
							))}
						</ul>
					</li>
				))}
			</ul>
		</>
	)
}
