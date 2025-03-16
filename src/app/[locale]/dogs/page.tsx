import { Language } from '@/i18n/types'
import Procedures from '@/modules/procedures/procedures'

export default async function Dogs({
	params,
}: {
	params: { locale: Language }
}) {
	return <Procedures locale={params.locale} type='dogs' />
}
