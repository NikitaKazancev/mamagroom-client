import { ConstantDto } from '@/api/constant/constant.types'
import { ExternalPath } from '@/api/file/file.api'
import {
	SettingsConstant,
	SettingsConstantTitle,
} from '@/components/settings/constant/settings-constant'
import { SettingsFileForm } from '@/components/settings/file/settings-file-form'
import { Settings } from '@/modules/settings/settings'
import { Layout } from '@/ui/layout/layout'
import { Section } from '@/ui/section/section'
import { GeneralProps } from '@/utils/types'
import Image from 'next/image'
import styles from './main-image-section.module.scss'

type Props = {
	titleData: ConstantDto & { settingsTitle: SettingsConstantTitle }
	descriptionData: ConstantDto & { settingsDescription: SettingsConstantTitle }
	fileUrl?: string
	generalProps: GeneralProps
	externalPath: ExternalPath
}

export const MainImageSection = async ({
	titleData,
	descriptionData,
	generalProps,
	fileUrl,
	externalPath,
}: Props) => {
	return (
		<Section className={styles.main} bg={false} pTop={false} pBottom={false}>
			<Image
				src={fileUrl ? fileUrl : ''}
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
					theme='light'
					data={{ path: externalPath }}
				/>
			)}
			<Layout>
				<div className={styles.headers}>
					<SettingsConstant
						data={{
							language: generalProps.language,
							type: titleData.type,
							name: titleData.name,
							value: titleData.value,
						}}
						title={titleData.settingsTitle}
						type='constant_short'
						roles={generalProps.roles}
					>
						<h2>{titleData.value}</h2>
					</SettingsConstant>
					<SettingsConstant
						data={{
							language: generalProps.language,
							type: descriptionData.type,
							name: descriptionData.name,
							value: descriptionData.value,
						}}
						title={descriptionData.settingsDescription}
						type='constant_long'
						roles={generalProps.roles}
					>
						<h3>{descriptionData.value}</h3>
					</SettingsConstant>
				</div>
			</Layout>
		</Section>
	)
}
