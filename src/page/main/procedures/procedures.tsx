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

export const MainProcedures = () => {
	return (
		<Section className={styles.main}>
			<Layout className={styles.layout}>
				<div className={styles.titles}>
					<Link href={SERVICES_DOGS.path} className={styles.titleWrapper}>
						<SectionTitle
							text={SERVICES_DOGS.name}
							color='blue'
							className={styles.title}
						/>
						<div className={styles.icon}>{<LuDog />}</div>
					</Link>
					<Link href={SERVICES_CATS.path} className={styles.titleWrapper}>
						<SectionTitle
							text={SERVICES_CATS.name}
							color='blue'
							className={styles.title}
						/>
						<div className={styles.icon}>{<LuCat />}</div>
					</Link>
				</div>
				<div className={styles.descriptions}>
					<p className={styles.description}>
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut
						architecto repellendus accusamus, unde consequatur dolorem cum
						obcaecati vitae numquam mollitia reiciendis totam veniam
						repudiandae nostrum. Quibusdam aliquid accusantium cum quos.
					</p>
					<p className={styles.description}>
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut
						architecto repellendus accusamu
					</p>
				</div>
				<div className={styles.videos}>
					<Video src={VIDEO_DOGS_PROCEDURES} className={styles.video} />
					<Video src={VIDEO_CATS_PROCEDURES} className={styles.video} />
				</div>
			</Layout>
		</Section>
	)
}
