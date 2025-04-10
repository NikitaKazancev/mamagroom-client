import { LINKS } from '@/constants/links.constants'
import { Link } from '@/i18n/routing'
import classNames from 'classnames'
import Image from 'next/image'
import styles from './logo.module.scss'

type Props = {
	theme: 'light' | 'dark'
	className?: string
	link?: string
	targetBlank?: boolean
}

export const Logo = ({ theme, className, link, targetBlank }: Props) => {
	const clazzName = classNames(styles.logo, className)

	let imagePath = ''
	if (theme === 'light') {
		imagePath = '/logos/logo-row-light.png'
	} else {
		imagePath = '/logos/logo-row-dark.png'
	}

	if (targetBlank) {
		return (
			<Link
				href={link || LINKS.pages.home}
				target='_blank'
				className={clazzName}
			>
				<Image src={imagePath} fill alt='logo' sizes='400px' />
			</Link>
		)
	}

	return (
		<Link href={link || LINKS.pages.home} className={clazzName}>
			<Image src={imagePath} fill alt='logo' sizes='400px' />
		</Link>
	)
}
