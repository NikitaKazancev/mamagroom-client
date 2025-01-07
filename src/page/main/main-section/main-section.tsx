import { fileApi } from '@/api/file/file.api'
import { SettingsConstant } from '@/components/settings/constant/settings-constant'
import { SettingsFileForm } from '@/components/settings/file/settings-constant-form'
import { Settings } from '@/modules/settings/settings'
import { Layout } from '@/ui/layout/layout'
import { Section } from '@/ui/section/section'
import { GeneralProps } from '@/utils/types'
import Image from 'next/image'
import styles from './main-section.module.scss'

type Props = {
	title: string
	description: string
	generalProps: GeneralProps
}

export const MainPageMainSection = async ({
	title,
	description,
	generalProps,
}: Props) => {
	return (
		<Section className={styles.main} bg={false} pTop={false} pBottom={false}>
			<Image
				src={fileApi.findDestination('mainBg')}
				alt='МамагруМ'
				width={1920}
				height={59}
				priority
			/>
			{generalProps.roles.filePostPut && (
				<Settings
					Component={SettingsFileForm}
					iconClassname={styles.settings}
					type='file'
				/>
			)}
			<Layout>
				<div className={styles.headers}>
					<SettingsConstant
						data={{
							language: generalProps.language,
							type: 'home-page',
							name: 'main-title',
							value: title,
						}}
						title='Главный заголовок'
						type='constant_short'
						roles={generalProps.roles}
					>
						<h1>{title}</h1>
					</SettingsConstant>
					<SettingsConstant
						data={{
							language: generalProps.language,
							type: 'home-page',
							name: 'main-description',
							value: description,
						}}
						title='Главное описание'
						type='constant_long'
						roles={generalProps.roles}
					>
						<h2>{description}</h2>
					</SettingsConstant>
				</div>
			</Layout>
		</Section>
	)
}
