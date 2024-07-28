import classNames from 'classnames'
import styles from './section.module.scss'

type Props = {
	children: React.ReactNode
	className?: string
	pTop?: boolean
	pBottom?: boolean
	bg?: boolean
}

export const Section = ({ children, className, pTop, pBottom, bg }: Props) => {
	if (pTop === undefined) {
		pTop = true
	}
	if (pBottom === undefined) {
		pBottom = true
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
				bg && styles.bg
			)}
		>
			{children}
		</section>
	)
}
