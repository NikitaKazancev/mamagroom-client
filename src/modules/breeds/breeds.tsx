import { breedApi } from '@/api/breed/breed.api'
import { getLanguage, useRoles } from '@/context/my-server-context'
import { Layout } from '@/ui/layout/layout'
import { Section } from '@/ui/section/section'
import { getTranslations } from 'next-intl/server'
import { BreedsClient } from './breeds-client'
import styles from './breeds.module.scss'

type Props = {
	type: 'dogs' | 'cats'
}

export const Breeds = async ({ type }: Props) => {
	const t = await getTranslations('Procedures')
	const tGeneral = await getTranslations('General')
	const language = await getLanguage()
	const roles = useRoles()

	const breeds = await breedApi.findMany({
		language: language,
		type,
		isDeleted:
			roles.breedPut || roles.breedDelete || roles.breedPost
				? undefined
				: false,
	})

	return (
		<>
			<div id='breeds' className={styles.identifier}></div>
			<Section>
				<Layout>
					<BreedsClient
						breeds={breeds}
						type={type}
						translations={{
							smallDog: t('smallDog'),
							mediumDog: t('mediumDog'),
							bigDog: t('bigDog'),
							searchPlaceholder: t('searchPlaceholder'),
							search: tGeneral('search'),
						}}
					/>
				</Layout>
			</Section>
		</>
	)
}
