import { VideoWithDescription } from '@/components/video-with-description/video-with-description'
import {
	VIDEO_CATS_PROCEDURES,
	VIDEO_DOGS_PROCEDURES,
} from '@/constants/video-links.constants'
import { Layout } from '@/ui/layout/layout'
import { Section } from '@/ui/section/section'
import classNames from 'classnames'
import { LuCat, LuDog } from 'react-icons/lu'
import styles from './procedures.module.scss'

export const MainProcedures = () => {
	return (
		<Section className={styles.main}>
			<Layout className={styles.layout}>
				<VideoWithDescription
					className={styles.video}
					videoSrc={VIDEO_DOGS_PROCEDURES}
					title='Процедуры для собак'
					icon={<LuDog />}
					description='Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut architecto repellendus accusamus, unde consequatur dolorem cum obcaecati vitae numquam mollitia reiciendis totam veniam repudiandae nostrum. Quibusdam aliquid accusantium cum quos.'
				/>
				{/* <div className={styles.separation}></div> */}
				<VideoWithDescription
					videoSrc={VIDEO_CATS_PROCEDURES}
					title='Процедуры для кошек'
					icon={<LuCat />}
					description='Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut architecto repellendus accusamus, unde consequatur dolorem cum obcaecati vitae numquam molliti'
					className={classNames(styles.video, styles.rightVideo)}
				/>
			</Layout>
		</Section>
	)
}
