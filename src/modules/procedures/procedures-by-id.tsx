import { constantApi } from '@/api/constant/constant.api'
import { fileApi } from '@/api/file/file.api'
import { Language } from '@/i18n/types'
import { MainImageSection } from '@/modules/main-image-section/main-image-section'
import { Prices } from '@/modules/prices/prices'
import { MainPageReviews } from '@/page/main/reviews-section/reviews-section'
import { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'User Management',
	description: 'Manage system users and their roles',
}

export default async function ProceduresById({
	locale,
	id,
	type,
}: {
	locale: Language
	id: string
	type: 'dogs' | 'cats'
}) {
	const constants = await constantApi.findMany({
		language: locale,
		type: `${type}Page`,
	})
	if (!constants) {
		return null
	}

	const mainImageUrl = await fileApi.findDestination(
		`pages/${type}`,
		'main-bg'
	)

	return (
		<>
			<MainImageSection
				titleData={{
					language: locale,
					type: `${type}-page`,
					name: 'main-title',
					value: constants[`${type}Page_mainTitle`],
				}}
				descriptionData={{
					language: locale,
					type: `${type}-page`,
					name: 'main-description',
					value: constants[`${type}Page_mainDescription`],
				}}
				fileUrl={mainImageUrl}
				externalPath={`pages/${type}/main-bg`}
			/>
			<Prices id={id} type={type} />
			<MainPageReviews />
		</>
	)
}
