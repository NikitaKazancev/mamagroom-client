import { ConstantDto } from '@/api/constant/constant.types'
import { ExternalPath } from '@/api/file/file.api'
import { SettingsConstant } from '@/components/settings/constant/settings-constant'
import { SettingsFileForm } from '@/components/settings/file/settings-file-form'
import { useRoles } from '@/context/my-server-context'
import { Settings } from '@/modules/settings/settings'
import { Layout } from '@/ui/layout/layout'
import { Section } from '@/ui/section/section'
import Image from 'next/image'
import styles from './main-image-section.module.scss'

type Props = {
	titleData: ConstantDto
	descriptionData: ConstantDto
	fileUrl?: string
	externalPath: ExternalPath
}

export const MainImageSection = async ({
	titleData,
	descriptionData,
	fileUrl,
	externalPath,
}: Props) => {
	const roles = useRoles()

	return (
		<Section className={styles.main} bg={false} pTop={false} pBottom={false}>
			<Image
				src={fileUrl ? fileUrl : ''}
				alt={titleData.value}
				priority
				fill
				sizes='100wv'
			/>
			{roles.filePostPut && (
				<Settings
					Component={SettingsFileForm}
					iconClassname={styles.settings}
					type='file'
					theme='light'
					data={{ path: externalPath }}
					formTitle='Фото'
				/>
			)}
			<Layout>
				<div className={styles.headers}>
					<SettingsConstant
						data={{
							type: titleData.type,
							name: titleData.name,
							value: titleData.value,
						}}
						title='Значение'
						type='constant_short'
						formTitle='Главный заголовок'
					>
						<h2>{titleData.value}</h2>
					</SettingsConstant>
					<SettingsConstant
						data={{
							type: descriptionData.type,
							name: descriptionData.name,
							value: descriptionData.value,
						}}
						title='Значение'
						type='constant_long'
						formTitle='Главное описание'
					>
						<h3>{descriptionData.value}</h3>
					</SettingsConstant>
				</div>
			</Layout>
		</Section>
	)
}
