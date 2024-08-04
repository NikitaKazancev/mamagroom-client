import { GridList } from '@/modules/grid-list/grid-list'
import { Layout } from '@/ui/layout/layout'
import { SectionTitle } from '@/ui/section-title/section-title'
import { Section } from '@/ui/section/section'
import styles from './values.module.scss'

const VALUES = [
	{
		title: 'Ценность 1',
		description:
			'Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur, autem?',
		imgSrc: '/pages/main/slider/0.png',
	},
	{
		title: 'Ценность 2',
		description:
			'Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur, autem?',
		imgSrc: '/pages/main/slider/1.png',
	},
	{
		title: 'Ценность 3',
		description:
			'Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur, autem?',
		imgSrc: '/pages/main/slider/2.png',
	},
	{
		title: 'Ценность 4',
		description:
			'Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur, autem?',
		imgSrc: '/pages/main/slider/3.png',
	},
	{
		title: 'Ценность 5',
		description:
			'Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur, autem?',
		imgSrc: '/pages/main/slider/4.png',
	},
	{
		title: 'Ценность 6',
		description:
			'Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur, autem?',
		imgSrc: '/pages/main/slider/5.png',
	},
]

export const ValuesMainSection = () => {
	return (
		<Section className={styles.main}>
			<Layout>
				<SectionTitle text='наши ценности' color='blue' />
				<GridList className={styles.list} content={VALUES} />
			</Layout>
		</Section>
	)
}
