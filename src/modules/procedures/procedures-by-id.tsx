import { breedApi } from '@/api/breed/breed.api'
import { priceApi } from '@/api/price/price.api'
import { UseTranslation } from '@/components/use-translation/use-translation'
import { LINKS } from '@/constants/links.constants'
import { Language } from '@/i18n/types'
import { Prices } from '@/modules/prices/prices'
import { generalPageData } from '@/utils/functions'
import { ImageSectionWithoutChange } from '../main-image-section/image-section-without-change/image-section-without-change'

export default async function ProceduresById({
	locale,
	id,
	type,
}: {
	locale: Language
	id: string
	type: 'dogs' | 'cats'
}) {
	const { mainImageUrl } = await generalPageData({
		params: { locale },
		constantsPageType: `${type}Page`,
		mainImagePageType: `pages/${type}`,
	})
	const breed = await breedApi.findById(id)
	const prices = await priceApi.findMany({
		breedId: id,
		isDeleted: false,
	})

	const schemas = [
		{
			'@context': 'https://schema.org',
			'@type': 'WebPage',
			name: breed?.name,
			url: `${LINKS.site.url}/${locale}/dogs/${id}`,
		},
		{
			'@context': 'https://schema.org',
			'@type': 'WebPageElement',
			name: breed?.name,
			url: `${LINKS.site.url}/${locale}/dogs/${id}#main`,
		},
		{
			'@context': 'https://schema.org',
			'@type': 'WebPageElement',
			name: breed?.name,
			url: `${LINKS.site.url}/${locale}/dogs/${id}#prices`,
		},
	] as any[]

	prices.forEach(price => {
		schemas.push({
			'@context': 'https://schema.org',
			'@type': 'Offer',
			name: `${breed?.name} (${price.procedure.name})`,
			description: `${breed?.name} (${price.procedure.name})`,
			price: price.price,
			priceCurrency: 'RUB',
		})
	})

	return (
		<>
			<UseTranslation />
			<ImageSectionWithoutChange
				title={breed?.name}
				fileUrl={mainImageUrl}
			/>
			<Prices id={id} type={type} />

			{schemas.map((schema, index) => (
				<script
					key={index}
					type='application/ld+json'
					suppressHydrationWarning
					dangerouslySetInnerHTML={{
						__html: JSON.stringify(schema),
					}}
				/>
			))}
		</>
	)
}
