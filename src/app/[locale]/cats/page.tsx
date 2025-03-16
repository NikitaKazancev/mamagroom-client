import { Language } from '@/i18n/types'
import Procedures from '@/modules/procedures/procedures'

export default async function Cats({
	params,
}: {
	params: { locale: Language }
}) {
	return <Procedures locale={params.locale} type='cats' />
}
