import { Value } from '@/api/values/values.api'
import classNames from 'classnames'
import Image from 'next/image'
import { SettingsValue } from '../settings/values/values-link'
import styles from './inside-cards.module.scss'

type Props = {
	data: Value[]
	className?: string
}

export const InsideCards = ({ data, className }: Props) => {
	return (
		<div className={styles.listWrapper}>
			<ul className={classNames(styles.main, className)}>
				{data.map(item => (
					<li
						className={classNames(styles.item, styles.transition)}
						key={item.title}
					>
						<h3 className={styles.title}>{item.title}</h3>
						<p className={styles.description}>{item.description}</p>
						<Image
							src={item.imageName}
							alt={item.title}
							fill
							className={styles.img}
							sizes='400px'
						/>
						<SettingsValue
							data={{ ...item }}
							iconClassname={styles.settings}
							theme='light'
							formTitle='Изменение ценности'
						/>
					</li>
				))}
			</ul>
		</div>
	)
}
