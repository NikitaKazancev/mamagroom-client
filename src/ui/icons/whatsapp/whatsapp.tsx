import { LINKS } from '@/constants/links.constants'
import classNames from 'classnames'
import Link from 'next/link'
import { FaWhatsapp } from 'react-icons/fa'
import styles from './whatsapp.module.scss'

type Props = {
	theme: 'light' | 'dark'
}

export const WhatsAppIcon = ({ theme }: Props) => {
	return (
		<Link href={LINKS.foreign.whatsapp} target='_blank'>
			<FaWhatsapp className={classNames(styles.icon, styles[theme])} />
		</Link>
	)
}
