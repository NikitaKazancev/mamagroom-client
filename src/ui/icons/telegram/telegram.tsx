import { TELEGRAM_LINK } from '@/constants/links.constants'
import classNames from 'classnames'
import Link from 'next/link'
import { FaTelegramPlane } from 'react-icons/fa'
import styles from './telegram.module.scss'

type Props = {
	theme: 'light' | 'dark'
}

export const TelegramIcon = ({ theme }: Props) => {
	return (
		<Link href={TELEGRAM_LINK} target='_blank'>
			<FaTelegramPlane className={classNames(styles.icon, styles[theme])} />
		</Link>
	)
}
