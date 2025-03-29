import { SettingsConstant } from '@/components/settings/constant/settings-constant'
import { LINKS } from '@/constants/links.constants'
import { Link } from '@/i18n/routing'
import { Layout } from '@/ui/layout/layout'
import { SectionTitle } from '@/ui/section-title/section-title'
import { Section } from '@/ui/section/section'
import { Video } from '@/ui/video/video'
import { GeneralProps } from '@/utils/types'
import { LuCat, LuDog } from 'react-icons/lu'
import styles from './procedures.module.scss'

type Props = {
	dogsTitle: string
	dogsDescription: string
	catsTitle: string
	catsDescription: string
	generalProps: GeneralProps
}

export const MainPageProcedures = ({
	dogsTitle,
	dogsDescription,
	catsTitle,
	catsDescription,
	generalProps,
}: Props) => {
	return (
		<Section className={styles.main}>
			<Layout className={styles.layout}>
				<div className={styles.titles}>
					<SettingsConstant
						data={{
							language: generalProps.language,
							type: 'home-page',
							name: 'procedures-for-dogs-title',
							value: dogsTitle,
						}}
						title='Значение'
						iconClassname={styles.settings}
						type='constant_short'
						roles={generalProps.roles}
						theme='dark'
						formTitle='Заголовок'
					>
						<Link href={LINKS.pages.dogs} className={styles.titleWrapper}>
							<SectionTitle
								text={dogsTitle}
								color='blue'
								className={styles.title}
							/>
							<div className={styles.icon}>{<LuDog />}</div>
						</Link>
					</SettingsConstant>
					<SettingsConstant
						data={{
							language: generalProps.language,
							type: 'home-page',
							name: 'procedures-for-cats-title',
							value: catsTitle,
						}}
						title='Значение'
						iconClassname={styles.settings}
						type='constant_short'
						roles={generalProps.roles}
						theme='dark'
						formTitle='Заголовок'
					>
						<Link href={LINKS.pages.cats} className={styles.titleWrapper}>
							<SectionTitle
								text={catsTitle}
								color='blue'
								className={styles.title}
							/>
							<div className={styles.icon}>{<LuCat />}</div>
						</Link>
					</SettingsConstant>
				</div>
				<div className={styles.descriptions}>
					<SettingsConstant
						data={{
							language: generalProps.language,
							type: 'home-page',
							name: 'procedures-for-dogs-description',
							value: dogsDescription,
						}}
						title='Значение'
						iconClassname={styles.settings}
						type='constant_long'
						roles={generalProps.roles}
						theme='dark'
						formTitle='Описание'
					>
						<p className={styles.description}>{dogsDescription}</p>
					</SettingsConstant>

					<SettingsConstant
						data={{
							language: generalProps.language,
							type: 'home-page',
							name: 'procedures-for-cats-description',
							value: catsDescription,
						}}
						title='Значение'
						iconClassname={styles.settings}
						type='constant_long'
						roles={generalProps.roles}
						theme='dark'
						formTitle='Описание'
					>
						<p className={styles.description}>{catsDescription}</p>
					</SettingsConstant>
				</div>
				<div className={styles.videos}>
					<Video
						src={LINKS.video.dogsProcedures}
						className={styles.video}
					/>
					<Video
						src={LINKS.video.catsProcedures}
						className={styles.video}
					/>
				</div>
			</Layout>
		</Section>
	)
}
