import { VacancyDto } from '@/api/vacancy/vacancy.api'
import { Button } from '@/ui/button/button'
import { Layout } from '@/ui/layout/layout'
import { Section } from '@/ui/section/section'
import { useTranslations } from 'next-intl'
import { SettingsVacancy } from '../settings/vacancy/vacancy-link'
import styles from './feed.module.scss'

type Props = {
	data: VacancyDto[]
}

export const Feed = ({ data }: Props) => {
	const t = useTranslations('Vacancies')

	return (
		<Section>
			<Layout>
				<ul className={styles.main}>
					{data.map(item => (
						<li key={item.id} className={styles.item}>
							<SettingsVacancy
								data={{
									...item,
								}}
								iconClassname={styles.settings}
								theme='dark'
								formTitle={'Изменение вакансии'}
							/>
							<div className={styles.info}>
								<h3 className={styles.title}>{item.name}</h3>
								<p className={styles.desc}>{item.description}</p>
								<Button
									text={t('linkText')}
									theme='dark'
									href={item.link}
									isExternalLink
								/>
							</div>
						</li>
					))}
				</ul>
			</Layout>
		</Section>
	)
}
