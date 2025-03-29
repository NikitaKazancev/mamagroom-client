import { Price, priceApi } from '@/api/price/price.api'
import { procedureApi } from '@/api/procedure/procedure.api'
import { SettingsPriceForm } from '@/components/settings/prices/prices-form'
import { LINKS } from '@/constants/links.constants'
import { Link } from '@/i18n/routing'
import { Layout } from '@/ui/layout/layout'
import { Section } from '@/ui/section/section'
import { GeneralProps } from '@/utils/types'
import { AddItem } from '../settings/add/add-item'
import { MergedPrice, Table } from '../table/table'
import styles from './prices.module.scss'

const mergePrices = (prices: Price[]) => {
	const map = new Map<string, MergedPrice>()

	prices.forEach(price => {
		const key = price.procedure.id
		if (!map.has(key)) {
			map.set(key, {
				...price,
				weight: [price.weight],
				time: [price.time],
				price: [price.price],
			})
		} else {
			const existing = map.get(key)!
			existing.weight.push(price.weight)
			existing.time.push(price.time)
			existing.price.push(price.price)
		}
	})

	return Array.from(map.values()).map(price => {
		if (price.weight.length === 1) return price

		const sortedIndices = price.weight
			.map((w, i) => ({ w, i }))
			.sort((a, b) => a.w - b.w)
			.map(({ i }) => i)

		price.weight = sortedIndices.map(i => price.weight[i])
		price.time = sortedIndices.map(i => price.time[i])
		price.price = sortedIndices.map(i => price.price[i])

		return price
	})
}

export const Prices = async ({
	id,
	type,
	generalProps,
}: {
	id: string
	type: 'dogs' | 'cats'
	generalProps: GeneralProps
}) => {
	const prices = await priceApi.findMany({
		breedId: id,
		language: generalProps.language,
		isDeleted:
			generalProps.roles.priceDelete ||
			generalProps.roles.pricePut ||
			generalProps.roles.pricePost
				? undefined
				: false,
	})
	const procedures = await procedureApi.findMany({
		language: generalProps.language,

		isDeleted:
			generalProps.roles.procedureDelete ||
			generalProps.roles.procedurePut ||
			generalProps.roles.procedurePost
				? undefined
				: false,
	})

	const isAdmin = generalProps.roles.pricePut || generalProps.roles.priceDelete

	let resPrices = undefined
	if (isAdmin) {
		resPrices = prices.map(price => ({
			...price,
			weight: [price.weight],
			time: [price.time],
			price: [price.price],
		}))
	} else {
		resPrices = mergePrices(prices)
	}

	return (
		<>
			<div id='prices' className={styles.identifier}></div>
			<Section className={styles.main}>
				<Layout>
					<div className={styles.breadCrumbs}>
						<Link
							href={`${
								type === 'dogs' ? LINKS.pages.dogs : LINKS.pages.cats
							}#breeds`}
						>
							←{' '}
							{type === 'dogs'
								? 'Процедуры для собак'
								: 'Процедуры для кошек'}
						</Link>
					</div>
					<div className={styles.prices}>
						{resPrices.length > 0 ? (
							<Table
								data={resPrices}
								columns={
									isAdmin
										? ['procedure', 'time', 'weight', 'price']
										: ['procedure', 'time', 'price']
								}
								generalProps={generalProps}
								procedures={procedures}
							/>
						) : (
							<span>
								Для выбранной породы услуги пока не предоставляются
							</span>
						)}
						<AddItem
							data={{
								id: '',
								breedId: id,
								procedureId: '',
								price: 1000,
								weight: 0,
								time: 60,
							}}
							type='price'
							Component={SettingsPriceForm}
							postRole={generalProps.roles.pricePost}
							className={styles.addItem}
							procedures={procedures}
							formTitle='Добавление цены'
						/>
					</div>
				</Layout>
			</Section>
		</>
	)
}
