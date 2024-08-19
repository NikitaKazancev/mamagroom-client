import { SERVICES_CATS, SERVICES_DOGS } from '@/constants/pages.constants'
import {
	VIDEO_CATS_PROCEDURES,
	VIDEO_DOGS_PROCEDURES,
} from '@/constants/video-links.constants'
import { Layout } from '@/ui/layout/layout'
import { SectionTitle } from '@/ui/section-title/section-title'
import { Section } from '@/ui/section/section'
import { Video } from '@/ui/video/video'
import Link from 'next/link'
import { LuCat, LuDog } from 'react-icons/lu'
import styles from './procedures.module.scss'

type Props = {
	dogsTitle: string
	dogsDescription: string
	catsTitle: string
	catsDescription: string
}

export const MainProcedures = ({
	dogsTitle,
	dogsDescription,
	catsTitle,
	catsDescription,
}: Props) => {
	return (
		<Section className={styles.main}>
			<Layout className={styles.layout}>
				<div className={styles.titles}>
					<Link href={SERVICES_DOGS.link} className={styles.titleWrapper}>
						<SectionTitle
							text={dogsTitle}
							color='blue'
							className={styles.title}
						/>
						<div className={styles.icon}>{<LuDog />}</div>
					</Link>
					<Link href={SERVICES_CATS.link} className={styles.titleWrapper}>
						<SectionTitle
							text={catsTitle}
							color='blue'
							className={styles.title}
						/>
						<div className={styles.icon}>{<LuCat />}</div>
					</Link>
				</div>
				<div className={styles.descriptions}>
					<p className={styles.description}>{dogsDescription}</p>
					<p className={styles.description}>{catsDescription}</p>
				</div>
				<div className={styles.videos}>
					<Video src={VIDEO_DOGS_PROCEDURES} className={styles.video} />
					<Video src={VIDEO_CATS_PROCEDURES} className={styles.video} />
				</div>
			</Layout>
		</Section>
	)
}
