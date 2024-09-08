import classNames from 'classnames'
import styles from './section.module.scss'

type Props = {
	children: React.ReactNode
	className?: string
	pTop?: boolean
	pBottom?: boolean
	pTopForHeader?: boolean
	bg?: boolean
}

export const Section = ({
	children,
	className,
	pTop,
	pBottom,
	pTopForHeader,
	bg,
}: Props) => {
	if (pTop === undefined) {
		pTop = true
	}
	if (pBottom === undefined) {
		pBottom = true
	}
	if (pTopForHeader === undefined) {
		pTopForHeader = false
	}
	if (bg === undefined) {
		bg = true
	}

	return (
		<section
			className={classNames(
				styles.section,
				className,
				pTop && styles.pTop,
				pBottom && styles.pBottom,
				bg && styles.bg,
				pTopForHeader && styles.pTopForHeader
			)}
		>
			{children}
		</section>
	)
}
