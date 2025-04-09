import { breedApi } from '@/api/breed/breed.api'
import { Language } from '@/i18n/types'
import ProceduresById from '@/modules/procedures/procedures-by-id'
import { buildMetadata } from '@/utils/functions'
import { Metadata, ResolvingMetadata } from 'next'

export async function generateMetadata(
	{
		params,
	}: {
		params: { locale: Language; id: string }
	},
	parent: ResolvingMetadata
): Promise<Metadata> {
	const breed = await breedApi.findById(params.id)

	return await buildMetadata({
		title: breed?.name,
		pageName: 'cats',
		parentMetadata: parent,
		params,
		constantsType: 'catsPage',
	})
}

export default function Cats({
	params,
}: {
	params: { locale: Language; id: string }
}) {
	return <ProceduresById locale={params.locale} id={params.id} type='cats' />
}
