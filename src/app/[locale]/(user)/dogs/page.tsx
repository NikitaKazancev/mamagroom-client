import { Language } from '@/i18n'
import { Section } from '@/ui/section/section'
import { getTranslations } from 'next-intl/server'

export async function generateMetadata({
	params,
}: {
	params: { locale: string }
}) {
	const t = await getTranslations({
		namespace: 'Dogs',
		locale: params.locale,
	})

	return {
		title: t('metadataTitle'),
	}
}

export default async function ProceduresForDogs({
	params,
}: {
	params: { locale: Language }
}) {
	return <Section pTopForHeader>dogs</Section>
}
