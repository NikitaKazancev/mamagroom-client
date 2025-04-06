import { breedApi } from '@/api/breed/breed.api'
import { Language } from '@/i18n/types'
import ProceduresById from '@/modules/procedures/procedures-by-id'
import { Metadata } from 'next'

export async function generateMetadata({
	params,
}: {
	params: { locale: Language; id: string }
}): Promise<Metadata> {
	const breed = await breedApi.findById(params.id)

	return {
		title: breed?.name,
	}
}

export default function Dogs({
	params,
}: {
	params: { locale: Language; id: string }
}) {
	return <ProceduresById locale={params.locale} id={params.id} type='dogs' />
}
