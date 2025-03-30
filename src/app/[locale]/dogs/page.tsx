import { constantApi } from '@/api/constant/constant.api'
import { Language } from '@/i18n/types'
import Procedures from '@/modules/procedures/procedures'
import { Metadata } from 'next'

export async function generateMetadata({
	params,
}: {
	params: { locale: string }
}): Promise<Metadata> {
	const constants = await constantApi.findMany({
		language: params.locale as Language,
		type: 'dogsPage',
	})

	return {
		title: constants?.dogsPage_mainTitle,
		description: constants?.dogsPage_mainDescription,
	}
}

export default async function Dogs({
	params,
}: {
	params: { locale: Language }
}) {
	return <Procedures locale={params.locale} type='dogs' />
}
