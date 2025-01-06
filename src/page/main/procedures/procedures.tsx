import { LINKS } from '@/constants/links.constants'
import { Link } from '@/navigation'
import { Layout } from '@/ui/layout/layout'
import { SectionTitle } from '@/ui/section-title/section-title'
import { Section } from '@/ui/section/section'
import { Video } from '@/ui/video/video'
import { LuCat, LuDog } from 'react-icons/lu'
import styles from './procedures.module.scss'

type Props = {
	dogsTitle: string
	dogsDescription: string
	catsTitle: string
	catsDescription: string
}

export const MainPageProcedures = ({
	dogsTitle,
	dogsDescription,
	catsTitle,
	catsDescription,
}: Props) => {
	return (
		<Section className={styles.main}>
			<Layout className={styles.layout}>
				<div className={styles.titles}>
					<Link href={LINKS.pages.dogs} className={styles.titleWrapper}>
						<SectionTitle
							text={dogsTitle}
							color='blue'
							className={styles.title}
						/>
						<div className={styles.icon}>{<LuDog />}</div>
					</Link>
					<Link href={LINKS.pages.cats} className={styles.titleWrapper}>
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
					<Video
						src={LINKS.video.dogsProcedures}
						className={styles.video}
					/>
					<Video
						src={LINKS.video.dogsProcedures}
						className={styles.video}
					/>
				</div>
			</Layout>
		</Section>
	)
}
