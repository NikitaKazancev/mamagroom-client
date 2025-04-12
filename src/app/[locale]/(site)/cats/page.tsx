import { Language } from '@/i18n/types'
import Procedures from '@/modules/procedures/procedures'
import { buildMetadata } from '@/utils/functions'
import { Metadata, ResolvingMetadata } from 'next'

export async function generateMetadata(
	{
		params,
	}: {
		params: { locale: Language }
	},
	parent: ResolvingMetadata
): Promise<Metadata> {
	return await buildMetadata({
		pageName: 'cats',
		parentMetadata: parent,
		params,
		constantsType: 'catsPage',
	})
}

export default function Cats({ params }: { params: { locale: Language } }) {
	return <Procedures locale={params.locale} type='cats' />
}
