import classNames from 'classnames'
import { TbWorld } from 'react-icons/tb'
import styles from './word.module.scss'

type Props = {
	theme: 'light' | 'dark'
}

export const WorldIcon = ({ theme }: Props) => {
	return <TbWorld className={classNames(styles.icon, styles[theme])} />
}
