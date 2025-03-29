import { breedApi } from '@/api/breed/breed.api'
import { Layout } from '@/ui/layout/layout'
import { Section } from '@/ui/section/section'
import { GeneralProps } from '@/utils/types'
import { BreedsClient } from './breeds-client'
import styles from './breeds.module.scss'

type Props = {
	type: 'dogs' | 'cats'
	generalProps: GeneralProps
}

export const Breeds = async ({ type, generalProps }: Props) => {
	const breeds = await breedApi.findMany({
		language: 'ru',
		type,
		isDeleted:
			generalProps.roles.breedPut ||
			generalProps.roles.breedDelete ||
			generalProps.roles.breedPost
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
						generalProps={generalProps}
					/>
				</Layout>
			</Section>
		</>
	)
}
